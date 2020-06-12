import React, { Component } from 'react'
import Contact from './Contact'

import './common.css'

export class Contacts extends Component {
  compareContacts(a, b) {
    if(!a.messages.length) {
      if(!b.messages.length) {
        return 0
      }
      return 1
    }
    if(!b.messages.length) {
      if(!a.messages.length) {
        return 0
      }
      return -1
    }
    const aLastMessageDate = new Date(a.messages[a.messages.length - 1].date)
    const bLastMessageDate = new Date(b.messages[b.messages.length - 1].date)
    if ( aLastMessageDate < bLastMessageDate ){
      return 1;
    }
    if ( aLastMessageDate > bLastMessageDate ){
      return -1;
    }
    return 0;
  }
  render() {
    const contactsSorted = this.props.contacts.slice()
    contactsSorted.sort(this.compareContacts)
    return (
      <div className='contacts__container'>
          {contactsSorted.map((contact, index) => (
            <Contact key={`contact-${index}`} title={contact.title} subtitle={contact.subtitle} unread={contact.unread} onClick={() => {
              const index = this.props.contacts.findIndex((element) => contact.id === element.id)
              return this.props.handleAddChat(index)
            }}/>
          ))}
        </div>
    )
  }
}

export default Contacts
