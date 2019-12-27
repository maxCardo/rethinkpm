import React, { Component } from 'react'
import Table from '../Table'
import {OPEN_INQUIRY_CHAT} from '../../../actions/type'
import './CrmDashboard.css'
import { connect } from 'react-redux';

export class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterString: '',
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
          label: 'Phone'
        },
        {
          accessor: 'status.lastActive',
          label: 'Last Contact',
          mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
        },
        {
          accessor: 'status.scheduled',
          label: 'Appointment',
        },
        {
          accessor: 'status.toured.tourRes',
          label: 'Tour Results',
          mapper: (data) => data === 'undefined' ? 'Not yet toured' : undefined 
        },
        {
          reactComponent: true,
          label: 'Actions',
          render: (row) =>
          <div>
            <div>
              <button className='dashboard__action-button' onClick={() =>  this.props.openInquiryChat(row._id)}>
                <i className="fas fa-comments"></i>
              </button>
            </div>
          </div>
        },
      ],
      filteredData: this.props.data
    }
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
    return (
      <div>
        <div className='searchContainer'>
          <input className='form-control searchInput' onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
        </div>
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
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    openInquiryChat:(inquiryId) => dispatch({type: OPEN_INQUIRY_CHAT, payload: inquiryId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)

