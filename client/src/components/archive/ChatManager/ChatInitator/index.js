import React, { Component } from 'react'
import ChatContainer from '../common/ChatContainer'
import Contacts from '../../common/Contacts'

export class ChatInitiator extends Component {
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
      id: contact.id,
      name: contact.name,
      status: contact.status,
      open: true,
      messages: contact.messages
    }
    this.props.onAddChat(chat)
  }
}

export default ChatInitiator
