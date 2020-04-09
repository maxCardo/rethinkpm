import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'

import Table from '../Table'
import { SET_AGENT_OPPORTUNITIES } from '../../../actions/type'

export class brokerDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            filterString: '',
            loading: true,
            headers: [
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
                  mapper: this.formatPhoneNumber
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
            ],
            filteredData: this.props.data
        }
    }
    formatPhoneNumber(data) {
      if(!data) return ''
      const phoneNumber = (data + '').replace(/ /g, '')
      if(phoneNumber.length > 10) {
        return `(${phoneNumber.substring(1,4)}) ${phoneNumber.substring(4,7)}-${phoneNumber.substring(7)}`
      } else {
        return `(${phoneNumber.substring(0,3)}) ${phoneNumber.substring(3,6)}-${phoneNumber.substring(6)}`
      }
    }
    componentDidMount() {
        axios.get('/api/sales/agents').then( (res) => {
            let agentsWithSales = res.data.filter((agent) => agent.sales > 0)
            this.props.setAgents({agentOpportunities: agentsWithSales, agentOpportunitiesRaw: res.data});
            console.log('Done')
        })
        .then((res) => {
            this.setState({ loading: false });
        })
    }

    cancelBubbling(e) {
        e.stopPropagation()
        return true
    }

    render() {
        return (
            <div>
                <div className='searchContainer'>
                    <input 
                      className='form-control searchInput' 
                      tabIndex={0}
                      onChange={(e) => this.setState({filterString: e.target.value})} 
                      placeholder='Search' 
                    />
                </div>
                <div className="container-fluid " style={{overflow: 'auto', maxHeight: '80vh'}}>
                    <div className="col-12" >
                        <h2 className='sectionTitle'>Best of last 2 years</h2>
                        <Table
                            headers={this.state.headers}
                            data={this.props.agents ? this.props.agents : []}
                            pageSize={10}
                            sorting={true}
                            sortBy='sales'
                            sortDirection='desc'
                            filter={this.state.filterString}
                            fontSize={12}
                            onClickRow={this.handleClickRow}
                            className="agentInfoTable"
                        />
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
  return {
    agents: state.brokerDashboard.agentOpportunities
}};
const mapDispatchToProps = dispatch => {
    return {
        setAgents:(agents) => dispatch({type: SET_AGENT_OPPORTUNITIES, payload: agents})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(brokerDashboard)

