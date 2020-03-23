import React, { Component } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

export class AddRecordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'note'
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
              <Form.Control as="select" value={this.state.type} onChange={this.handleChange.bind(this, 'type')}>
                <option value='note'>Note</option>
                <option value='request'>Request</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="updateForm.prospectName">
              <Form.Label>Record:</Form.Label>
              <Form.Control type="text" value={this.state.record} onChange={this.handleChange.bind(this, 'content')}/>
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
    const data = Object.assign({
      date: new Date(),
      user: 'Admin'
    }, this.state)
    this.props.handleSubmit(data)
    this.handleClose()
  }
  handleClose() {
    this.setState((prevState) => {
      const newState = {}
      for(let property in prevState) {
        newState[property] = undefined
      }
      newState.type = 'note'
      return newState
    })
    this.props.handleClose()
  }
}

export default AddRecordModal
