import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {SET_AGENT_OPPORTUNITIES} from '../../../../actions/type';
import axios from 'axios';
import Select from "react-select";
import statusSelectOptions from './statusSelectOptions'
import './style.css'
import FilteredList from './FilteredList';
import AgentFiltersModal from './AgentFiltersModal';
import SaveFilterModal from './SaveFilterModal'
import LoadingScreen from '../../LoadingScreen/LoadingScreen'

class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: statusSelectOptions,
      data: [],
      showModal: false,
      filterString: '',
      statusSelected: {label: 'All', value: 'all'},
      hasMore: true,
      items: [],
      defaultFilters: [
        {
          field: 'sales',
          filterType: '>',
          value: 0
        }
      ],
      modalFilters: [],
      audiences: [],
      filters:[],
      loading: true,
      officeOptions: []
    };
    this.handleModalSubmit = this.handleModalSubmit.bind(this)
    this.saveAudience = this.saveAudience.bind(this)
    this.saveFilter = this.saveFilter.bind(this)
  }

  componentDidMount() {
    axios.get('/api/sales/agents').then((res) => {
      let agentsWithSales = res.data.filter((agent) => agent.sales > 0);
      this.props.setAgents({agentOpportunities: agentsWithSales, agentOpportunitiesRaw: res.data});
      agentsWithSales = agentsWithSales.map((agent) => {
        const agentCopy = Object.assign({}, agent)
        if(agent.areas) {
          agentCopy.areasArray = agent.areas.map((area) => area.name)
        } else {
          agentCopy.areasArray = []
        }
        if(agent.zipCodes) {
          agentCopy.zipCodesArray = agent.zipCodes.map((zipcode) => zipcode.name)
        } else {
          agentCopy.zipCodesArray = []
        }
        agentCopy.areasAndZipCodesArray = agentCopy.areasArray.concat(agentCopy.zipCodesArray)
        return agentCopy
      })
      this.setState({data: agentsWithSales, loading:false});
    })
    axios.get('/api/sales/audiences').then((res) => {
      this.setState({audiences: res.data})
    })
    axios.get('/api/sales/filters').then((res) => {
      this.setState({filters: res.data})
    })
    axios.get('/api/sales/offices').then((res) => {
      const officeOptions = res.data.map((office) => ({value: office.name, label: office.name}))
      this.setState({officeOptions})
    })
  }

  render() {
    let filters = this.state.defaultFilters.slice()
    let modalFilters = this.state.modalFilters.slice()
    filters = filters.concat(modalFilters)
    let data = this.state.data.slice()
    if(this.state.statusSelected.value !== 'all') {
      const foundInFilters = this.state.filters.find(elem => elem._id == this.state.statusSelected.value)
      const foundInAudiences = this.state.audiences.find(elem => elem._id == this.state.statusSelected.value)
      console.log('Found in audiences')
      console.log(foundInAudiences)
      console.log('Found in filters')
      console.log(foundInFilters)
      if(foundInFilters) {
        filters = filters.concat(foundInFilters.filters)
      } else if(foundInAudiences) {
        data = foundInAudiences.leads.map((leadId) => {
          return this.state.data.find((agent) => agent._id == leadId)
        })
      } else {
        filters.push({
          field: 'status',
          filterType: '==',
          value: this.state.statusSelected.value
        })
      }
    }
    if(this.state.filterString) {
      filters.push({
        field: 'fullName',
        filterType: 'includes',
        value: this.state.filterString
      })
    }
    const selectOptions = this.state.agentStatusSelect.slice()
    if(this.state.audiences.length) {
      const audiencesOptions = this.state.audiences.map((audience) => ({value: audience._id, label: audience.name}))
      selectOptions.push({
        label: 'Audiences',
        options: audiencesOptions
      })
    }
    if(this.state.filters.length) {
      const filtersOptions = this.state.filters.map((audience) => ({value: audience._id, label: audience.name}))
      selectOptions.push({
        label: 'Filters',
        options: filtersOptions
      })
    }
    return (
      <LoadingScreen loading={this.state.loading}>
        <Select
          className="agentStatusFilter"
          onChange={value => this.setState({statusSelected: value})}
          defaultValue="All"
          options={selectOptions}
          placeholder='Select Status'
        />
        <div className="agent-list__search-container">
          <input
            className='form-control agent-list__search-input'
            tabIndex={0}
            onChange={(e) => this.setState({filterString: e.target.value})}
            placeholder='Search'
          />
          <button className='agent-list__filter-icon' onClick={() => this.setState({showAgentFiltersModal: true})}>
            <i className="fas fa-filter"></i>
          </button>
        </div>
        {this.state.modalFilters.length ?
          <div className='agent-list__filtering-options-container'>
            <button onClick={() => this.setState({modalFilters: []})}>Clear filter</button>
            <button onClick={() => this.setState({showSaveFilterModal: true})}>Save audience</button>
          </div>
          :
          ''
        }
        <FilteredList
          data={data}
          filters={filters}
          dataSetKey={this.state.statusSelected.value}
          />
        <AgentFiltersModal 
          show={this.state.showAgentFiltersModal} 
          handleClose={() => this.setState({showAgentFiltersModal: false})}
          handleSubmit={this.handleModalSubmit}
          officeOptions={this.state.officeOptions}
        />
        <SaveFilterModal
          show={this.state.showSaveFilterModal}
          handleClose={() => this.setState({showSaveFilterModal: false})}
          saveAudience={this.saveAudience}
          saveFilter={this.saveFilter}
        />
      </LoadingScreen>
    );
  }
  handleModalSubmit(filters) {
    this.setState({modalFilters: filters})
  }
  async saveAudience(name) {
    const filters = this.state.modalFilters;
    let filteredData = this.state.data
    filters.forEach(filter => {
      filteredData = FilteredList.processFilter(filter, filteredData)
    });
    const leads = filteredData.map((lead) => lead._id)
    const config = {headers: {'Content-Type': 'application/json'}};
    const body = JSON.stringify({ name, filters, leads});
    await axios.post('/api/sales/audiences',body, config)
    console.log('Audience saved')
  }
  async saveFilter(name) {
    const filters = this.state.modalFilters;
    const config = {headers: {'Content-Type': 'application/json'}};
    const body = JSON.stringify({ name, filters});
    await axios.post('/api/sales/filters',body, config)
    console.log('Filter saved')
  }
}

const mapStateToProps = state => ({
  allAgents: state.brokerDashboard.agentOpportunitiesRaw
});

const mapDispatchToProps = dispatch => {
  return {
    setAgents: (agents) => dispatch({type: SET_AGENT_OPPORTUNITIES, payload: agents})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentList);