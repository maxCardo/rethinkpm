import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'

import Table from '../Table'
import {OPEN_INQUIRY_CHAT, SET_INQUIRIES} from '../../../actions/type'
import {Link} from "react-router-dom";
import UpdateModal from "../CrmDashboard/UpdateModal";

export class brokerDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    name: "Neiman Roslyn",
                    agentPhoneNumber: "412-889-5488",
                    agentEmail: "rneiman@howardhanna.com",
                    worksAt: "HOWARD HANNA SHADYSIDE OFFICE",
                    soldProperties: 44,
                    revenueMade: 34677195
                },
                {
                    name: "States Maureen",
                    agentPhoneNumber: "412-728-3856",
                    agentEmail: "maureenstates@neighborhoodrealtyservices.net",
                    worksAt: "NEIGHBORHOOD REALTY SERVICES",
                    soldProperties: 81,
                    revenueMade: 23415735
                },
                {
                    name: "Ingram Cindy",
                    agentPhoneNumber: "412-302-3016",
                    agentEmail: "pghrealtors@cs.com",
                    worksAt: "COLDWELL BANKER REAL ESTATE",
                    soldProperties: 28,
                    revenueMade: 21407511
                },
                {
                    name: "Rost Julie",
                    agentPhoneNumber: "412.855.9213",
                    agentEmail: "JulieRost@tprsold.com",
                    worksAt: "BERKSHIRE HATHAWAY THE PREFERRED REALTY",
                    soldProperties: 32,
                    revenueMade: 19073259
                },
                {
                    name: "White Theresa",
                    agentPhoneNumber: "412-302-6995",
                    agentEmail: "Theresa@CallTheresaWhite.com",
                    worksAt: "RE/MAX SELECT REALTY",
                    soldProperties: 113,
                    revenueMade: 17650162
                },
                {
                    name: "Veenis Stephanie",
                    agentPhoneNumber: "412-551-9117",
                    agentEmail: "sveenis@howardhanna.com",
                    worksAt: "RE/MAX SELECT REALTY",
                    soldProperties: 113,
                    revenueMade: 17093200
                },
                {
                    name: "Howard Molly",
                    agentPhoneNumber: "412-298-7823",
                    agentEmail: "mollyhoward@howardhanna.com",
                    worksAt: "HOWARD HANNA FOX CHAPEL OFFICE",
                    soldProperties: 40,
                    revenueMade: 16422996
                },
                {
                    name: "Reed Michael",
                    agentPhoneNumber: "330-2061741",
                    agentEmail: "michaelreed@thepreferredrealty.com",
                    worksAt: "BERKSHIRE HATHAWAY THE PREFERRED REALTY",
                    soldProperties: 82,
                    revenueMade: 16370755
                },
                {
                    name: "Pirain Reed",
                    agentPhoneNumber: "800-746-9464",
                    agentEmail: "reed@ppmrealty.com",
                    worksAt: "NEXTHOME PPM REALTY",
                    soldProperties: 73,
                    revenueMade: 15751624
                },
                {
                    name: "West Bobby",
                    agentPhoneNumber: "412-805-9829",
                    agentEmail: "bobby.west@pittsburghmoves.com",
                    worksAt: "COLDWELL BANKER REAL ESTATE",
                    soldProperties: 64,
                    revenueMade: 15601188
                },
            ],
            filterString: '',
            showModal: false,
            headers: [
                {
                    accessor: 'name',
                    label: 'Name'
                },
                {
                    accessor: 'agentEmail',
                    label: 'Contact Email'
                },
                {
                    accessor: 'agentPhoneNumber',
                    label: 'Phone'
                },
                {
                    accessor: 'worksAt',
                    label: 'Current Company'
                },
                {
                    accessor: 'soldProperties',
                    label: 'Sold Listings'
                },
                {
                    accessor: 'revenueMade',
                    label: 'Revenue'
                },
            ],
            filteredData: this.props.data
        }
    }

    cancelBubbling(e) {
        e.stopPropagation()
        return true
    }

    formatPhoneNumber(data) {
        if (data.length > 10) {
            return `(${data.substring(1, 4)}) ${data.substring(4, 7)}-${data.substring(7)}`
        } else {
            return `(${data.substring(0, 3)}) ${data.substring(3, 6)}-${data.substring(6)}`
        }
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
                            pageSize={5}
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
    return {
        openInquiryChat:(inquiryId) => dispatch({type: OPEN_INQUIRY_CHAT, payload: {inquiryId, dispatch}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(brokerDashboard)

