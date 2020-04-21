import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'

import UpdateModal from './UpdateModal'
import Properties from './Properties'
import ChatManager from '../Chat/ChatManager'
import {SET_INQUIRIES, OPEN_INQUIRY_CHAT} from '../../../actions/type'
import Dashboard from '../dashboard/Dashboard'
import {Link, withRouter} from 'react-router-dom';


export class CrmDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertiesFilter: [],
      propertiesOpen: false,
      loading: true,
      data: this.props.data,
      showModal: false
    }
    this.onChangePropertiesFilter = this.onChangePropertiesFilter.bind(this)
    this.toggleProperties = this.toggleProperties.bind(this)
    this.handleClickRow = this.handleClickRow.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.headers = [
      {
        accessor: 'prospect.name',
        label: 'Name'
      },
      {
        accessor: 'listing',
        label: 'Property'
      },
      {
        accessor: 'prospect.phone.phoneNumber',
        label: 'Phone',
        mapper: 'phone'
      },
      {
        accessor: 'status.lastActive',
        label: 'Last Contact',
        mapper: 'date'
      },
      {
        accessor: 'status.scheduled.schDate',
        label: 'Appointment',
        mapper: (data) => (data === 'undefined' || data === 'null' || !data) ? 'No Appointment' : new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'status.toured.tourRes',
        label: 'Tour Results',
        mapper: (data) => data === 'undefined' ? 'Not yet toured' : data 
      },
      {
        reactComponent: true,
        label: 'Actions',
        sortable: false,
        render: (row) =>
        <div>
          <div>
            <button className='dashboard__action-button' onClick={(e) => this.cancelBubbling(e) && this.props.openInquiryChat(row._id)}>
              <i className="fas fa-comments"></i>
            </button>
            <button className='dashboard__action-button' onClick={(e) => this.cancelBubbling(e) && this.openModal(row)}>
              <i className="fas fa-edit"></i>
            </button>
            <Link className='dashboard_action-button' to={`/profile/${row._id}`}>
              <i className='fas fa-user'></i>
            </Link>
          </div>
        </div>
      },
    ]
    this.states = [
      {
        label: 'Hot',
        key: 'engaged'
      },
      {
        label: 'Cold',
        key: 'cold'
      },
      {
        label: 'Sourced',
        key: 'new'
      },
      {
        label: 'Upcoming Appointments',
        key: 'upcoming'
      },
      {
        label: 'Application',
        key: 'application'
      },
      {
        label: 'Toured',
        key: 'toured'
      },
    ]
  }
  cancelBubbling(e){
    e.stopPropagation()
    return true
  }
  componentDidMount() {
    axios.get('/api/rent_lead/open_leads').then((res) => {
      const properties = new Set()
      const data = {
        upcoming: [],
        engaged: [],
        cold: [],
        scheduled: [],
        toured: [],
        application: [],
        new: [],
      }
      res.data.forEach((lead) => {
        properties.add(lead.listing)
        data[lead.status.currentStatus].push(lead)
      })

      this.props.setInquiries({inquiries: data, inquiriesRaw: res.data})
      this.setState({properties: [...properties], loading: false, data})
    })
    
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className={`${this.state.propertiesOpen ? 'col-md-9' : 'col-md-11'} col-sm-12`} >
            {this.state.data &&
              <Dashboard
                type='tabbed'
                data={this.state.data} 
                loading={this.state.loading} 
                headers={this.headers}
                states={this.states}
                onClickRow={this.handleClickRow}
              />
            }
          </div>
          <div className={`${this.state.propertiesOpen ? 'col-md-3' : 'col-md-1'} col-sm-12`}>
            {this.state.properties &&
              <Properties 
                onChangePropertiesFilter={this.onChangePropertiesFilter}
                properties={this.state.properties}
                toggleOpen={this.toggleProperties}
                open={this.state.propertiesOpen}
              />
            }
          </div>
        </div>
        <UpdateModal show={this.state.showModal} data={this.state.prospectUpdating} handleClose={this.handleModalClose}/>
        <ChatManager />
      </div>
    )
  }
  toggleProperties() {
    this.setState((prevState) => ({propertiesOpen: !prevState.propertiesOpen}))
  }
  onChangePropertiesFilter(propertiesFilter) {
    this.setState({propertiesFilter: propertiesFilter.slice()})
    const filteredData = {}
    for(let status in this.props.data) {
      const filteredStatus = this.props.data[status].filter((elem) => {
        return propertiesFilter.includes(elem.listing)
      })
      filteredData[status] = filteredStatus
    }
    this.setState({data: filteredData})
  }
  handleClickRow(row) {
    this.props.history.push(`/profile/inquiry/${row._id}`)
  }
  handleModalClose() {
    this.setState({showModal: false})
  }
  openModal(row) {
    this.setState({showModal: true, prospectUpdating: row})
  }
}

const mapStateToProps = state => ({
  data: state.dashboard.inquiries
})
const mapDispatchToProps = dispatch => {
  return {
    setInquiries:(inquiries) => dispatch({type: SET_INQUIRIES, payload: inquiries}),
    openInquiryChat:(inquiryId) => dispatch({type: OPEN_INQUIRY_CHAT, payload: {inquiryId, dispatch}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CrmDashboard))

