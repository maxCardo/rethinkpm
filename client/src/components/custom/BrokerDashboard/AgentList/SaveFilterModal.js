import React, { Component } from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

export class SaveFilterModal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: ''
    }
    this.state = {
      ...this.initialState
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSaveAsFilter = this.handleSaveAsFilter.bind(this)
    this.handleSaveAsAudience = this.handleSaveAsAudience.bind(this)
  }
  render() {
    return (
      <Modal size='lg' show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSaveAsFilter}>
            Save As Filter
          </Button>
          <Button variant="primary" onClick={this.handleSaveAsAudience}>
            Save As Audience
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleChange(property, e) {
    this.setState({[property]: e.target.value})
  }
  handleClose() {
    this.setState({...this.initialState})
    this.props.handleClose()
  }
  handleSaveAsFilter() {
    this.props.saveFilter(this.state.name)
    this.handleClose()
  }
  handleSaveAsAudience() {
    this.props.saveAudience(this.state.name)
    this.handleClose()
  }
}

export default SaveFilterModal
