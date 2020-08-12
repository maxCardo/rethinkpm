import React, { Component } from 'react'
import Table from '../../../core/Table'
import { Form, Modal, Button } from 'react-bootstrap'
import './screens.css'

export class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      noteOpened: ''
    }
    this.headers = [
      {
        accessor: 'date',
        label: 'Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'type',
        label: 'Type'
      },
      {
        accessor: 'note',
        label: 'Note',
        className: 'history-screen__note-column',
        mapper: (data) => data.length > 120 ? data.substring(0, 120) + '...' : data
      },
      {
        accessor: 'user',
        label: 'User',
      }
    ]
    this.notes = [
      {
        date: new Date(),
        type: 'Note',
        note: 'This is a very long note. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        user: 'Oscar'
      },
      {
        date: new Date(),
        type: 'Note',
        note: 'Second note',
        user: 'Adam'
      }
    ]
    this.logs = [
      {
        date: new Date(),
        type: 'Log',
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
    this.handleModalClose = this.handleModalClose.bind(this)
  }
  render() {
    return (
      <div className='history-screen__container'>
        <div className='history-screen__select-container'>
          <Form.Control as="select" className='history-screen__select' size="sm" onChange={this.handleChange.bind(this, "dataToShow")}>
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
          onClickRow={(row) => this.setState({modalOpen: true, noteOpened: row.note})}
        />
        <Modal size='lg' show={this.state.modalOpen} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.noteOpened}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </Modal.Footer> 
        </Modal>
      </div>
    )
  }
  handleModalClose() {
    this.setState({modalOpen: false, noteOpened: ''})
  }
  handleChange(property, e) {
    this.setState({[property]: e.target.value})
  }
}

export default HistoryScreen
