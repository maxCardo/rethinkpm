import React, { Component } from 'react'
import Contact from './Contact'

import './common.css'

export class Contacts extends Component {
  render() {
    return (
      <div className='contacts__container'>
          {this.props.contacts.map((contact, index) => (
            <Contact key={`contact-${index}`} name={contact.name} listing={contact.listing} unread={contact.unread} onClick={() => this.props.handleAddChat(index)}/>
          ))}
        </div>
    )
  }
}

export default Contacts
