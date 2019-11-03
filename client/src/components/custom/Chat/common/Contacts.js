import React, { Component } from 'react'
import Contact from './Contact'

import './common.css'

export class Contacts extends Component {
  render() {
    return (
      <div className='contacts__container'>
          {this.props.contacts.map((contact, index) => (
            <Contact name={contact.name} status={contact.status} onClick={() => this.props.handleAddChat(index)}/>
          ))}
        </div>
    )
  }
}

export default Contacts
