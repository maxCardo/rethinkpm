import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {SET_AGENT_OPPORTUNITIES} from '../../../actions/type';
import axios from 'axios';
import Select from "react-select";
import {agentStatus} from "../../../util/statusSchemas";


class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: agentStatus,
      data: []
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
      this.setState({data: res.data});
    })
      .then((res) => {
        this.setState({loadingAgents: false});
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let filteredAgents = [];

    if (prevState.statusSelected !== this.state.statusSelected && this.props.allAgents) {
      this.setState({loading: true});

      this.state.data.forEach((agent) => {
        if (agent.status == this.state.statusSelected.value && agent.sales > 0) {
          filteredAgents.push(agent);
        }
      });

      const agentsAll = (prevProps.allAgents) ? prevProps.allAgents : this.props.allAgents;

      this.props.setAgents({agentOpportunities: filteredAgents, agentOpportunitiesRaw: this.state.data});
      this.setState({loading: false});
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
    return (
      <Fragment>
        <Select
          className="agentStatusFilter"
          onChange={value => this.setState({ statusSelected: value })}
          defaultValue="All"
          options={this.state.agentStatusSelect}
        />
        <ul>
          {this.state.agentStatusSelect ? (
            theAgents.map((val, idx) => {
              return (<li>
                <div className="agent__picker-header">{val.firstName} {val.lastName} - {val.status}</div>
                <div className="agent__picker-body">
                  <span>skills status</span><span>{this.moneyFormat(val.sales)}</span></div>
              </li>)
            })) : ''}
        </ul>
      </Fragment>

    );
  }
}

const mapStateToProps = state => ({
  allAgents: state.brokerDashboard.agentOpportunities
});

const mapDispatchToProps = dispatch => {
  return {
    setAgents: (agents) => dispatch({type: SET_AGENT_OPPORTUNITIES, payload: agents})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentList);