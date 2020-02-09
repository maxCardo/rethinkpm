import React, { Component } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

export class AddRecordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logType: 'log'
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <Modal size='lg' show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updateForm.worflow">
              <Form.Label>Type of Log: </Form.Label>
              <Form.Control as="select" value={this.state.logType} onChange={this.handleChange.bind(this, 'logType')}>
                <option value='log'>Log</option>
                <option value='note'>Note</option>
                <option value='request'>Request</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="updateForm.prospectName">
              <Form.Label>Record:</Form.Label>
              <Form.Control type="text" value={this.state.record} onChange={this.handleChange.bind(this, 'record')}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleChange(property, e) {
    this.setState({[property]: e.target.value})
  }
  handleSubmit() {
    console.log(this.state)
    this.handleClose()
  }
  handleClose() {
    this.setState((prevState) => {
      const newState = {}
      for(let property in prevState) {
        newState[property] = undefined
      }
      newState.logType = 'log'
      return newState
    })
    this.props.handleClose()
  }
}

export default AddRecordModal
