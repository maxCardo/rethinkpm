import React, { Component } from 'react'

export class ChatBar extends Component {
  render() {
    const info = this.props.info
    return (
      <div className='chat-bar__container'>
        <div className='chat-bar__info-container'>
          <p className='chat-bar__title'>{info.title}</p>
          <p className='chat-bar__sub-title'>{info.subTitle}</p>
        </div>
        <div>

        </div>
      </div>
    )
  }
}

export default ChatBar
