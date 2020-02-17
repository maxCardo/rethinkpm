import React, { Component } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import DateTimeField from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import axios from 'axios'
import {connect} from 'react-redux'
import { UPDATE_INQUIRY } from '../../../actions/type'

export class UpdateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workflow: 'setAppointment'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
  renderSpecificForm() {
    switch(this.state.workflow) {
      case 'setAppointment':
        return this.renderAppointmentForm()
      case 'trackTour':
        return this.renderTourResultForm()
      case 'recordApplication':
        return this.renderApplicationForm()
    }
  }
  renderAppointmentForm() {
    return (
      <Form.Group controlId="updateForm.worflow">
        <Form.Label>Select date of appointment: </Form.Label>
        <DateTimeField onChange={this.handleDateChange.bind(this, 'appointmentDate')}/> 
      </Form.Group>
    )
  }
  renderTourResultForm() {
    return (
      <React.Fragment>
        <Form.Group controlId="updateForm.phoneNumber">
          <Form.Label>Scheduled Tour Date/Time:</Form.Label>
          <DateTimeField onChange={this.handleDateChange.bind(this, 'tourDate')}/> 
        </Form.Group>
        <Form.Group controlId="updateForm.tourResults">
          <Form.Label>Tour Results: </Form.Label>
          <Form.Control as="select" onChange={this.handleChange.bind(this, 'tourResults')}>
            <option value=''></option>
            <option value='completed'>Completed Tour</option>
            <option value='noShow'>No Show</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="updateForm.interestLevel">
          <Form.Label>Interest Level: </Form.Label>
          <Form.Control as="select" onChange={this.handleChange.bind(this, 'interestLevel')}>
            <option value=''></option>
            <option value='veryInterested'>Very Interested</option>
            <option value='someInterest'>Showed Some Interest</option>
            <option value='hard'>Hard to say</option>
            <option value='notInterested'>Not Interested</option>
          </Form.Control>
        </Form.Group>
      </React.Fragment>
    )
  }
  renderApplicationForm() {
    return (
      <React.Fragment>
        <Form.Group controlId="updateForm.phoneNumber">
          <Form.Label>Application Date/Time:</Form.Label>
          <DateTimeField onChange={this.handleDateChange.bind(this, 'appDate')}/> 
        </Form.Group>
        <Form.Group controlId="updateForm.holdFee">
          <Form.Label>Hold Fee: </Form.Label>
          <Form.Control as="select" onChange={this.handleChange.bind(this, 'holdFee')}>
            <option value=''></option>
            <option value='false'>Applied no Hold Fee</option>
            <option value='true'>Applied Paid Deposit</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="updateForm.appStatus">
          <Form.Label>App Status: </Form.Label>
          <Form.Control as="select" onChange={this.handleChange.bind(this, 'appStatus')}>
            <option value=''></option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
            <option value='lost'>Lost</option>
          </Form.Control>
        </Form.Group>
      </React.Fragment>
    )
  }
  handleChange(property, e) {
    this.setState({[property]: e.target.value})
  }
  handleDateChange(property, e) {
    this.setState({[property]: new Date(e._d)})
  }
  handleClose() {
    this.setState((prevState) => {
      const newState = {}
      for(let property in prevState) {
        newState[property] = undefined
      }
      newState.workflow = 'setAppointment'
      return newState
    })
    this.props.handleClose()
  }
  async handleSubmit() {
    if(this.state.status === 'dead' && !window.confirm('Are you sure you want to set the state of this lead as dead?')) {
      return
    }
    const body = JSON.stringify(this.state)
    const config = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.patch(`/api/rent_lead/update_inquiry/${this.props.data._id}`, body, config)
    this.props.updateInquiry(response.data)
    this.handleClose()
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => {
  return {
    updateInquiry:(inquiry) => dispatch({type: UPDATE_INQUIRY, payload: inquiry})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal)

