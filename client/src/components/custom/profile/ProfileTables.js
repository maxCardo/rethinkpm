import React, { Component } from 'react'
import Table from '../Table'

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
        accessor: 'record'
      },
      {
        accessor: 'date'
      },
      {
        accessor: 'user'
      }
    ]
  }
  render() {
    return (
      <div className='profile-tables__container'>
        <Table data={this.data} headers={this.headers}/>
      </div>
    )
  }
}

export default ProfileTables
