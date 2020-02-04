import React, { Component } from 'react'
import Message from './Message'

import './common.css'

export class Conversation extends Component {
  render() {
    return (
      <div className='chat__conversation' >
        {this.props.messages.map((message, index) => (
          <Message key={`message-${index}`} username={message.sender} message={message.content} userMessage={message.userMessage} date={message.date} />
        ))}
      </div>
    )
  }
}

export default Conversation
