import React, { Component } from 'react'
import Table from '../Table'
import {Tabs, Tab} from 'react-bootstrap'
import TableWithSearch from './TableWithSearch'

export class ProfileTables extends Component {
  constructor(props) {
    super(props)
    this.data = [
      {
        record: 'This is a note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is another note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is the last note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is a note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is another note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is the last note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is a note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is another note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is the last note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is a note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is another note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is the last note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is a note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is another note',
        date: '27/01/19',
        user: 'Admin'
      },
      {
        record: 'This is the last note',
        date: '27/01/19',
        user: 'Admin'
      },
    ]
    this.headers = [
      {
        accessor: 'record',
        label: 'Record'
      },
      {
        accessor: 'date',
        label: 'Date'
      },
      {
        accessor: 'user',
        label: 'User'
      }
    ]
  }
  render() {
    return (
      <div className='profile-tables__container'>
        <Tabs defaultActiveKey="logs">
          <Tab eventKey="logs" title="Logs">
            <TableWithSearch data={this.data} headers={this.headers}/>
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <TableWithSearch data={this.data} headers={this.headers}/>
          </Tab>
          <Tab eventKey="requests" title="Requests">
            <TableWithSearch data={this.data} headers={this.headers}/>
          </Tab>
        </Tabs>
        
      </div>
    )
  }
}

export default ProfileTables
