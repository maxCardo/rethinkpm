import React, { Component } from 'react'
import Table from '../Table'
import {Tabs, Tab} from 'react-bootstrap'
import TableWithSearch from './TableWithSearch'
import {connect} from 'react-redux'
import { SUBMIT_LOG } from '../../../actions/type'

export class ProfileTables extends Component {
  constructor(props) {
    super(props)
    this.headers = [
      {
        accessor: 'record',
        label: 'Record'
      },
      {
        accessor: 'date',
        label: 'Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'user',
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
    let logs = this.props.data[this.props.inquiryId] || []
    const notes = logs.filter((log) => log.type === 'note')
    const requests = logs.filter((log) => log.type === 'request')
    return (
      <div className='profile-tables__container'>
        <Tabs defaultActiveKey="logs">
          <Tab eventKey="logs" title="Logs">
            <TableWithSearch data={logs} headers={this.logHeaders} handleSubmit={this.handleSubmit} />
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
  handleSubmit(data) {
    this.props.addLog(data, this.props.inquiryId)
  }
}

const mapStateToProps = state => ({
  data: state.profile.logs
})

const mapDispatchToProps = dispatch => {
  return {
    addLog: (data, inquiryId) => dispatch({type: SUBMIT_LOG, payload: {data, inquiryId}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTables)
