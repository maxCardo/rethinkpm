import React, { Component } from 'react'
import ProfileIcon from './ProfileIcon'

import './common.css'

export class Message extends Component {
  render() {
    const options = {
      hour: 'numeric', minute: 'numeric'
    };
    const username = this.props.username ? this.props.username : '?'
    return (
      <div className={`message__container ${this.props.userMessage ? 'message__user-message-container' : ''}`}>
        <ProfileIcon name={username}/>
        <div className={`message__content ${this.props.userMessage ? 'message__user-message-content' : ''}`}>
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
