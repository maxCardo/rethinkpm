import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {SET_AGENT_OPPORTUNITIES} from '../../../actions/type';
import axios from 'axios';
import Select from "react-select";
import {agentStatus} from "../../../util/statusSchemas";
import {filterData} from "../../../util/commonFunctions";


class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: agentStatus,
      data: [],
      filterString: '',
      statusSelected: ''
    };

  }

  moneyFormat(sum) {
    return (new Intl.NumberFormat('en-US',
      {style: 'currency', currency: 'USD'}
    ).format(sum))
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    let filteredAgents = [];
    const agentsAll = (prevProps.allAgents) ? prevProps.allAgents : this.props.allAgents;

    if (prevState.statusSelected !== this.state.statusSelected && this.props.allAgents) {
      this.setState({loading: true});

      this.props.allAgents.forEach((agent) => {
        if (agent.status == this.state.statusSelected.value && agent.sales > 0) {
          filteredAgents.push(agent);
        }
      });

      this.props.setAgents({agentOpportunities: filteredAgents, agentOpportunitiesRaw: agentsAll});
      this.setState({data: filteredAgents, loading: false});
    }

    if (prevState.filterString !== this.state.filterString) {
      let filteredAgents = [];

      this.props.allAgents.forEach((agent) => {
        const name = agent.firstName;
        const lastName = agent.lastName;
        const fullName = (name + ' ' + lastName).toLowerCase();

        if (fullName.includes(this.state.filterString.toLowerCase())) {
          filteredAgents.push(agent);
        }
      });

      this.props.setAgents({agentOpportunities: filteredAgents, agentOpportunitiesRaw: agentsAll});
      this.setState({data: filteredAgents, loading: false});
    }

    if (prevProps.allAgents !== this.props.allAgents) {
      this.forceUpdate();
    }
  }

  render() {
    let theAgents = [];
    if (this.props.allAgents) {
      theAgents = this.props.allAgents;
    }
    if (this.state.data.length > 0) {
      theAgents = this.state.data;
    }

    return (
      <Fragment>
        <Select
          className="agentStatusFilter"
          onChange={value => this.setState({statusSelected: value})}
          defaultValue="All"
          options={this.state.agentStatusSelect}
          placeholder='Select Status'
        />
        <div className="list__search-container">
          <input
            className='form-control searchInput'
            tabIndex={0}
            onChange={(e) => this.setState({filterString: e.target.value})}
            placeholder='Search'
          />
        </div>
        <ul>
          {this.state.data ? (
            this.state.data.map((val, idx) => {
              if (val.sales > 0) {
                return (<li>
                  <Link to={`/profile/agent/${val._id}`}>
                    <div className="list__picker-header"><span>{val.firstName} {val.lastName}</span> <span
                      className="label__gray">{val.status}</span></div>
                    <div className="list__picker-body">
                      <span>skills status</span><span>{this.moneyFormat(val.sales)}</span>
                    </div>
                  </Link>
                </li> )
              }
            })) : ''}
        </ul>
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