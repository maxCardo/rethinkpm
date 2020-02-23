import React, { Component } from 'react'
import Conversation from './Conversation'
import ChatInput from './ChatInput'

import './common.css'

export class ChatUI extends Component {
  componentDidUpdate() {
    if(this.lastLengthUpdated !== this.props.messages.length) {
      this.props.scrollToBottom()
    }
    this.lastLengthUpdated = this.props.messages.length
  }
  render() {
    return (
      <div className='chat-ui__container'>
        <Conversation messages={this.props.messages} chatRef={this.props.chatRef}/>
        <ChatInput onSendMessage={this.props.onSendMessage} botOn={this.props.botOn}/>
      </div>
    )
  }
}

export default ChatUI
