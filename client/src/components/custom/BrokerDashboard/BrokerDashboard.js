import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {agentStatus} from "../../../util/statusSchemas";
import Table from '../Table'
import Select from 'react-select';
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
            ],
            filteredData: this.props.data,
            agentStatusSelect: agentStatus,
            statusSelected: {}
        }
    }

    componentDidMount() {
        axios.get('/api/sales/agents').then( (res) => {
            let agentsWithSales = res.data.filter((agent) => agent.sales > 0);
            this.props.setAgents({agentOpportunities: agentsWithSales, agentOpportunitiesRaw: res.data});
            this.setState({ data: res.data });
        })
        .then((res) => {
            this.setState({ loading: false });
        })
    }

    cancelBubbling(e) {
        e.stopPropagation()
        return true
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let filteredAgents = [];

        if (prevState.statusSelected !== this.state.statusSelected && this.props.agents) {
            this.setState({loading: true});

            this.state.data.forEach((agent) => {
                if (agent.status == this.state.statusSelected.value && agent.sales > 0) {
                    filteredAgents.push(agent);
                }
            });

            const agentsAll = (prevProps.agents) ? prevProps.agents : this.props.agents;

            this.props.setAgents({agentOpportunities: filteredAgents, agentOpportunitiesRaw: this.state.data});
            this.setState({loading: false});
        }
        if (prevProps.agents !== this.props.agents) {
            this.forceUpdate();
        }
    }

    render() {
        const groupStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        };
        const groupBadgeStyles = {
            backgroundColor: '#EBECF0',
            borderRadius: '2em',
            color: '#172B4D',
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 'normal',
            lineHeight: '1',
            minWidth: 1,
            padding: '0.16666666666667em 0.5em',
            textAlign: 'center',
        };

        const formatGroupLabel = data => (
            <div style={groupStyles}>
                <span>{data.label}</span>
                <span style={groupBadgeStyles}>{data.options.length}</span>
            </div>
        );

        return (
            <div>

                <div className='searchContainer agentsSearchContainer'>
                    <Select
                        className="agentStatusFilter"
                        onChange={value => this.setState({ statusSelected: value })}
                        defaultValue="All"
                        options={this.state.agentStatusSelect}
                        formatGroupLabel={formatGroupLabel}
                    />
                    <input 
                      className='form-control searchInput' 
                      tabIndex={0}
                      onChange={(e) => this.setState({filterString: e.target.value})} 
                      placeholder='Search' 
                    />
                </div>
                <div className="container-fluid " style={{overflow: 'auto', maxHeight: '80vh'}}>
                    <div className="col-12" >
                        <h2 className='sectionTitle'>All Agents</h2>
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
                            loading={this.state.loading}
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

