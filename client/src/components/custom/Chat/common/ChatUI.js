import React, { Component } from 'react'
import Conversation from './Conversation'
import ChatInput from './ChatInput'

import './common.css'

export class ChatUI extends Component {
  render() {
    return (
      <div className='chat-ui__container'>
        <Conversation messages={this.props.messages} chatRef={this.props.chatRef}/>
        <ChatInput onSendMessage={this.props.onSendMessage} />
      </div>
    )
  }
}

export default ChatUI
