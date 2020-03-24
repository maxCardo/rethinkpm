import React, { Component } from 'react'
import Table from '../Table'
import {Tabs, Tab} from 'react-bootstrap'
import TableWithSearch from './TableWithSearch'
import {connect} from 'react-redux'
import { UPDATE_INQUIRY, SET_INQUIRIES } from '../../../actions/type'
import axios from 'axios';

export class ProfileTables extends Component {
  constructor(props) {
    super(props)
    this.headers = [
      {
        accessor: 'content',
        label: 'Record'
      },
      {
        accessor: 'date',
        label: 'Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'user.name',
        label: 'User'
      }
    ]
    this.logHeaders = this.headers.slice()
    this.logHeaders.unshift({
      accessor: 'type',
      label: 'Type',
      mapper: (data) => data.charAt(0).toUpperCase() + data.slice(1)
    })
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    let logs = this.props.inquiry.notes
    const notes = logs ? logs.filter((log) => log.type === 'note') : []
    const requests = logs ? logs.filter((log) => log.type === 'request') : []
    return (
      <div className='profile-tables__container'>
        <Tabs defaultActiveKey="logs">
          <Tab eventKey="logs" title="Logs">
            <TableWithSearch 
              data={logs} 
              headers={this.logHeaders} 
              handleSubmit={this.handleSubmit} 
              sortBy='date'
              sortDirection='desc'
              sorting={true}
            />
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <TableWithSearch data={notes} headers={this.headers} handleSubmit={this.handleSubmit} />
          </Tab>
          <Tab eventKey="requests" title="Requests">
            <TableWithSearch data={requests} headers={this.headers} handleSubmit={this.handleSubmit} />
          </Tab>
        </Tabs>
        
      </div>
    )
  }
  async handleSubmit(data) {
    const config = {headers: {'Content-Type': 'application/json'}};
    const body = JSON.stringify(data)
    const response = await axios.post(`/api/rent_lead/update_inquiry/add_note/${this.props.inquiry._id}`, body, config);
    console.log(response)
    this.props.updateInquiry(response.data)
  }
}

const mapStateToProps = state => ({
  data: state.dashboard.inquiriesRaw
})

const mapDispatchToProps = dispatch => {
  return {
    updateInquiry: (payload) => dispatch({type: UPDATE_INQUIRY, payload}),
    setInquiries:(inquiries) => dispatch({type: SET_INQUIRIES, payload: inquiries})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTables)
