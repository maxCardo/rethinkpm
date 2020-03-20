import React, { Component } from 'react'
import Table from '../../Table'
import { Form } from 'react-bootstrap'
import './screens.css'

export class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.headers = [
      {
        accessor: 'date',
        label: 'Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'note',
        label: 'Note',
      },
      {
        accessor: 'user',
        label: 'User',
      }
    ]
    this.notes = [
      {
        date: new Date(),
        note: 'First note',
        user: 'Oscar'
      },
      {
        date: new Date(),
        note: 'Second note',
        user: 'Adam'
      }
    ]
    this.logs = [
      {
        date: new Date(),
        note: 'This is a log',
        user: 'Oscar'
      }
    ]
    this.state = {
      data: {
        all: this.notes.concat(this.logs),
        logs: this.logs,
        notes: this.notes,
      },
      dataToShow: 'all'
    }
  }
  render() {
    return (
      <div className='history-screen__container'>
        <div className='history-screen__select-container'>
          <Form.Control as="select" custom className='history-screen__select' size="sm" onChange={this.handleChange.bind(this, "dataToShow")}>
            <option value='all'>All</option>
            <option value='notes'>Notes</option>
            <option value='logs'>Logs</option>
          </Form.Control>
        </div>
        <Table 
          headers={this.headers}
          data={this.state.data[this.state.dataToShow]}
          pageSize={5} 
          sorting={true} 
          fontSize={12}
        />
      </div>
    )
  }
  handleChange(property, e) {
    this.setState({[property]: e.target.value})
  }
}

export default HistoryScreen
