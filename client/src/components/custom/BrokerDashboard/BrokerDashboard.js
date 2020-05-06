import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux'
import {agentStatus} from "../../../util/statusSchemas";
import Table from '../Table'
import Select from 'react-select';
import { SET_AGENT_OPPORTUNITIES, SET_ACTIVE_PROFILE } from '../../../actions/type'
import { withRouter } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';


export class brokerDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.agents,
            filterString: '',
            loading: true,
            filteredData: this.props.data,
            agentStatusSelect: agentStatus,
            statusSelected: {}
        }
        this.handleClickRow = this.handleClickRow.bind(this)
        this.headers = [
          {
              accessor: 'firstName',
              label: 'First Name'
          },
          {
              accessor: 'lastName',
              label: 'Last Name'
          },
          {
              accessor: 'emailAddress',
              label: 'Email'
          },
          {
            accessor: 'phone',
            label: 'Phone',
            mapper: 'phone'
          },
          {
              accessor: 'officeId',
              label: 'Office ID'
          },
          {
              accessor: 'sales',
              label: 'Revenue',
              mapper: (data) => (new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
              ).format(data)) // '$100.00')
          },
      ]
      this.states = [
        {
          label: 'Lead',
          key: 'new'
        },
        {
          label: 'Prospect',
          key: 'prospect'
        },
        {
          label: 'Pending Agent',
          key: 'pending'
        },
        {
          label: 'Agent',
          key: 'agent'
        },
        {
          label: 'Not Interested',
          key: 'notInterested'
        }
      ]
    }

    componentDidMount() {
      if(this.props.agents) {
        this.setState({loading: false})
        return
      }
        axios.get('/api/sales/agents').then( (res) => {
          let agentsWithSales = res.data.filter((agent) => agent.sales > 0);
          const data = {
            new: [],
            prospect: [],
            pending: [],
            agent: [],
            notInterested: [],
          }
          agentsWithSales.forEach((agent) => {
            data[agent.status].push(agent)
          })
          this.props.setAgents({agentOpportunities: data, agentOpportunitiesRaw: res.data});
          this.setState({ data, loading: false });
        })
    }

    cancelBubbling(e) {
        e.stopPropagation()
        return true
    }

    render() {
        return (
              <LoadingScreen loading={this.state.loading}>
                {this.props.agents &&
                  <Dashboard
                    type='select'
                    data={this.props.agents} 
                    loading={this.state.loading} 
                    headers={this.headers}
                    states={this.states}
                    onClickRow={this.handleClickRow}
                    sortBy='sales'
                    sortDirection='desc'
                  />
                }
              </LoadingScreen>
        )
    }
    handleClickRow(row) {
      console.log('runnning haddle click');
      //set records as slected record activeProfile 
      this.props.setActiveProfile(row)
      this.props.history.push(`/profile/agent/${row._id}`)
    }
}

const mapStateToProps = (state) => {
  return {
    agents: state.brokerDashboard.agentOpportunities
}};
const mapDispatchToProps = dispatch => {
    return {
        setAgents:(agents) => dispatch({type: SET_AGENT_OPPORTUNITIES, payload: agents}),
        setActiveProfile: (profile) => dispatch({type: SET_ACTIVE_PROFILE, payload: profile})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(brokerDashboard))

