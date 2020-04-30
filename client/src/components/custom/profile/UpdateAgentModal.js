import React, { Component } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import DateTimeField from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import axios from 'axios'
import {connect} from 'react-redux'
import { UPDATE_INQUIRY } from '../../../actions/type'

export class UpdateAgentModal extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <Modal size='lg' show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updateForm.prospectName">
              <Form.Label>Prospect Name:</Form.Label>
              <Form.Control type="text" disabled={true} value={this.props.data ? this.props.data.prospect.name : ''} />
            </Form.Group>
            <Form.Group controlId="updateForm.phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="text" disabled={true} value={this.props.data ? this.props.data.prospect.phone.phoneNumber : ''} />
            </Form.Group>
            <Form.Group controlId="updateForm.worflow">
              <Form.Label>Perform action: </Form.Label>
              <Form.Control as="select" value={this.state.workflow} onChange={this.handleChange.bind(this, 'workflow')}>
                <option value='setAppointment'>Set Appointment</option>
                <option value='trackTour'>Track Tour</option>
                <option value='recordApplication'>Record Application</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="updateForm.status">
              <Form.Label>Status: </Form.Label>
              <Form.Control as="select" value={this.state.status ? this.state.status : (this.props.data ? this.props.data.status.currentStatus : '')} onChange={this.handleChange.bind(this, 'status')}>
                <option value='engaged'>Hot</option>
                <option value='cold'>Cold</option>
                <option value='new'>Sourced</option>
                <option value='upcoming'>Upcoming Appointments</option>
                <option value='application'>Application</option>
                <option value='toured'>Toured</option>
                <option value='dead'>Dead</option>
              </Form.Control>
            </Form.Group>
            {this.renderSpecificForm()}
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
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    updateInquiry:(inquiry) => dispatch({type: UPDATE_INQUIRY, payload: inquiry})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAgentModal)

