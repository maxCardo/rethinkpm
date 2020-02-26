import React, { Component } from 'react'
import Table from '../Table'
import {OPEN_INQUIRY_CHAT} from '../../../actions/type'
import './CrmDashboard.css'
import { connect } from 'react-redux';
import UpdateModal from './UpdateModal';
import {Link} from 'react-router-dom';

export class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterString: '',
      showModal: false,
      headers: [
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
          mapper: (data) => `(${data.substring(1,4)}) ${data.substring(4,7)}-${data.substring(7)}`
        },
        {
          accessor: 'status.lastActive',
          label: 'Last Contact',
          mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
        },
        {
          accessor: 'status.scheduled.schDate',
          label: 'Appointment',
          mapper: (data) => console.log(data) || data ? new Intl.DateTimeFormat().format(new Date(data)) : 'No Appointment'
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
              <button className='dashboard__action-button' onClick={() =>  this.props.openInquiryChat(row._id)}>
                <i className="fas fa-comments"></i>
              </button>
              <button className='dashboard__action-button' onClick={() =>  this.openModal(row)}>
                <i className="fas fa-edit"></i>
              </button>
              <Link className='dashboard_action-button' to={`/profile/${row._id}`}>
                <i className='fas fa-user'></i>
              </Link>
            </div>
          </div>
        },
      ],
      filteredData: this.props.data
    }
    this.handleModalClose = this.handleModalClose.bind(this)
  }
  static getDerivedStateFromProps(props, state) {
    const filteredData = {}
    for(let status in props.data) {
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
    console.log(this.state.filteredData)
    return (
      <div>
        <div className='searchContainer'>
          <input className='form-control searchInput' tabIndex={0} onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
        </div>
        <div style={{overflow: 'auto', maxHeight: '80vh'}}>
          <div>
            <h2 className='sectionTitle'>Status 1: Hot</h2>
            <Table 
              headers={this.state.headers} 
              data={this.state.filteredData['engaged']} 
              pageSize={5} 
              sorting={true} 
              filter={this.state.filterString}   
              fontSize={12}
            />
          </div>
          <div>
            <h2 className='sectionTitle'>Status 2: Cold</h2>
            <Table 
              headers={this.state.headers} 
              data={this.state.filteredData['cold']} 
              pageSize={5} 
              sorting={true} 
              filter={this.state.filterString} 
              fontSize={12}
            />
          </div>
          <div>
            <h2 className='sectionTitle'>Status 3: Sourced</h2>
            <Table 
              headers={this.state.headers} 
              data={this.state.filteredData['new']} 
              pageSize={5} 
              sorting={true} 
              filter={this.state.filterString} 
              fontSize={12}
            />
          </div>
          <div className='section'>
            <h2 className='sectionTitle'>Status 4: Upcoming Appointments</h2>
            <Table 
              headers={this.state.headers} 
              data={this.state.filteredData['upcoming']} 
              pageSize={5} 
              sorting={true} 
              filter={this.state.filterString} 
              fontSize={12}
              
            />
          </div>
          <div className='section'>
            <h2 className='sectionTitle'>Status 5: Application</h2>
            <Table 
              headers={this.state.headers} 
              data={this.state.filteredData['application']} 
              pageSize={5} 
              sorting={true} 
              filter={this.state.filterString} 
              fontSize={12}
              
            />
          </div>
          <div className='section'>
            <h2 className='sectionTitle'>Status 6: Toured</h2>
            <Table 
              headers={this.state.headers} 
              data={this.state.filteredData['toured']} 
              pageSize={5} 
              sorting={true} 
              filter={this.state.filterString} 
              fontSize={12}
              
            />
          </div>
        </div>
        <UpdateModal show={this.state.showModal} data={this.state.prospectUpdating} handleClose={this.handleModalClose}/>
      </div>
      
    )
  }
  handleModalClose() {
    this.setState((prevState) => ({showModal: false}))
  }
  openModal(row) {
    this.setState({showModal: true, prospectUpdating: row})
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    openInquiryChat:(inquiryId) => dispatch({type: OPEN_INQUIRY_CHAT, payload: {inquiryId, dispatch}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)

