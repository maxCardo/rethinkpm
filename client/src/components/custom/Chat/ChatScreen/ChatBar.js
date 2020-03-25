import React, { Component } from 'react'

export class ChatBar extends Component {
  render() {
    const info = this.props.info
    return (
      <div className='chat-bar__container'>
        <div className='chat-bar__info-container'>
          <p className='chat-bar__name'>{info.name}</p>
          <p className='chat-bar__listing'>{info.listing}</p>
        </div>
        <div>

        </div>
      </div>
    )
  }
}

export default ChatBar
