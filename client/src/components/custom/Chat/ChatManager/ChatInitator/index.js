import React, { Component } from 'react'
import ChatContainer from '../common/ChatContainer'
import Contacts from '../../common/Contacts'

export class index extends Component {
  render() {
    return (
      <ChatContainer name='Chat'>
        <Contacts contacts={this.props.contacts} handleAddChat={this.handleAddChat.bind(this)} />
      </ChatContainer>
    )
  }
  handleAddChat(index) {
    const contact = this.props.contacts[index]

    const chat = {
      name: contact.name,
      status: contact.status,
      open: true,
      messages: []
    }
    this.props.onAddChat(chat)
  }
}

export default index
