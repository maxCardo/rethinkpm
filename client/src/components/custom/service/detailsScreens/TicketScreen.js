import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import './screens.css'

export class TicketScreen extends Component {
  render() {
    const service = this.props.service
    return (
      <div className='ticket-screen__container'>
        <Form.Group controlId="ticketScreen.issue">
          <Form.Label>Issue: </Form.Label>
          <Form.Control as="textarea" rows="2" size='sm' value={service.name ? service.name : ''} disabled={true}/>
        </Form.Group>
        <Form.Group controlId="ticketScreen.description">
          <Form.Label>Description: </Form.Label>
          <Form.Control as="textarea" rows="5" size='sm' value={service.description ? service.description : ''} disabled={true}/>
        </Form.Group>
        <Form.Group controlId="ticketScreen.resolution">
          <Form.Label>Resolution: </Form.Label>
          <Form.Control as="textarea" rows="5" size='sm' value={service.resolution ? service.resolution : ''} disabled={true}/>
        </Form.Group>
      </div>
    )
  }
}

export default TicketScreen
