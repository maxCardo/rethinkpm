import React, { Component } from 'react'
import ProfileIcon from './ProfileIcon'

import './common.css'

export class Message extends Component {
  render() {
    const options = {
      dateStyle: 'short', timeStyle: 'short'
    };
    const username = this.props.username ? this.props.username : '?'
    let messageContentClass = 'message__content '
    if(this.props.userMessage) {
      messageContentClass += 'message__user-message-content '
    }
    if(this.props.username === 'Tara') {
      messageContentClass += 'message__tara-message-content'
    }
    return (
      <div className={`message__container ${this.props.userMessage ? 'message__user-message-container' : ''}`}>
        <ProfileIcon name={username}/>
        <div className={messageContentClass}>
          {this.props.message}
          <div className='message__date'>
            {new Intl.DateTimeFormat(undefined, options).format(this.props.date)}
          </div>
        </div>
      </div>
    )
  }
}

export default Message
