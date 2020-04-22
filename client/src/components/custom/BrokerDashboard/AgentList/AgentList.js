import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {SET_AGENT_OPPORTUNITIES} from '../../../../actions/type';
import axios from 'axios';
import Select from "react-select";
import {agentStatus} from "../../../../util/statusSchemas";
import {filterData} from "../../../../util/commonFunctions";
import InfiniteScroll from "react-infinite-scroll-component";
import './style.css'
import FilteredList from './FilteredList';

class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: agentStatus,
      data: [],
      filterString: '',
      statusSelected: {label: 'All', value: 'all'},
      hasMore: true,
      items: [],
      defaultFilters: [
        {
          field: 'sales',
          type: '>',
          value: 0
        }
      ]
    };
  }

  componentDidMount() {
    axios.get('/api/sales/agents').then((res) => {
      let agentsWithSales = res.data.filter((agent) => agent.sales > 0);
      this.props.setAgents({agentOpportunities: agentsWithSales, agentOpportunitiesRaw: res.data});
      this.setState({data: agentsWithSales});
    })
      .then((res) => {
        this.setState({loadingAgents: false});
      });

  }

  render() {
    let filters = this.state.defaultFilters.slice()
    if(this.state.statusSelected.value !== 'all') {
      filters.push({
        field: 'status',
        type: '==',
        value: this.state.statusSelected.value
      })
    }
    filters.push({
      field: 'fullName',
      type: 'includes',
      value: this.state.filterString ? this.state.filterString : ''
    })
    console.log(filters)
    return (
      <Fragment>
        <Select
          className="agentStatusFilter"
          onChange={value => this.setState({statusSelected: value})}
          defaultValue="All"
          options={this.state.agentStatusSelect}
          placeholder='Select Status'
        />
        <div className="agent-list__search-container">
          <input
            className='form-control agent-list__search-input'
            tabIndex={0}
            onChange={(e) => this.setState({filterString: e.target.value})}
            placeholder='Search'
          />
          <div className='agent-list__filter-icon'>
            <i className="fas fa-filter"></i>
          </div>
        </div>
        <FilteredList
          data={this.state.data}
          filters={filters}
          />
      </Fragment>

    );
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