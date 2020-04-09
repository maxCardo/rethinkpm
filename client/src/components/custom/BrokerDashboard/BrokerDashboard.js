import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'

import Table from '../Table'
import {OPEN_INQUIRY_CHAT, SET_AGENT_OPPORTUNITIES, SET_INQUIRIES} from '../../../actions/type'
import {Link} from "react-router-dom";
import UpdateModal from "../CrmDashboard/UpdateModal";

export class brokerDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            filterString: '',
            showModal: false,
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

    componentDidMount() {
        axios.get('/api/sales/agents').then( (res) => {
            let properties = new Set()
            let agents = [];
            res.data.forEach((lead) => {
                if (lead.sales > 0) {
                    agents.push(lead);
                    properties.add(lead);
                }
            });
            const data = agents;
            this.props.setAgents({allAgentOpportunities: data, agentOpportunitiesRaw: res.data});
            this.setState({data, properties: [...properties]});

        })
        .then((res) => {
            this.setState({ loading: false });
        })


    }

    cancelBubbling(e) {
        e.stopPropagation()
        return true
    }

    static getDerivedStateFromProps(props, state) {
        const filteredData = {}
        for (let status in props.data) {
            const filteredStatus = props.data[status].filter((elem) => {
                return props.propertiesFilter.includes(elem.listing)
            })
            filteredData[status] = filteredStatus
        }
        return {
            filteredData,
            propertiesFilter: props.propertiesFilter
        }
    }

    render() {
        return (
            <div>
                <div className='searchContainer'>
                    <input className='form-control searchInput' tabIndex={0}
                           onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
                </div>
                <div className="container-fluid " style={{overflow: 'auto', maxHeight: '80vh'}}>
                    <div className="col-12" >
                        <h2 className='sectionTitle'>Best of last 2 years</h2>
                        <Table
                            headers={this.state.headers}
                            data={this.state.data}
                            pageSize={10}
                            sorting={true}
                            filter={this.state.filterString}
                            fontSize={12}
                            onClickRow={this.handleClickRow}
                            className="agentInfoTable"
                        />
                    </div>
                </div>
                <UpdateModal show={this.state.showModal} data={this.state.prospectUpdating}
                             handleClose={this.handleModalClose}/>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    agents: state.data
});
const mapDispatchToProps = dispatch => {
    return {
        setAgents:(agents) => dispatch({type: SET_AGENT_OPPORTUNITIES, payload: agents})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(brokerDashboard)

