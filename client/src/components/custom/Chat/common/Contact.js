import React, { Component } from 'react'
import ProfileIcon from '../../common/ProfileIcon'

import './common.css'

export class Contact extends Component {
  render() {
    const statusColors = {
      'true': '#00C851',
      'false': '#CCC',
    }
    return (
      <div className='contact__container' onClick={this.props.onClick}>
        <ProfileIcon name={this.props.title} />
        <div className='contact__info'>
          <div className='contact__name'>{this.props.title}</div>
          <div className='contact__listing'>{this.props.subTitle}</div>
        </div>
        <div className='contact__connected-icon-container'>
          <svg style={{color: statusColors[this.props.unread]}} aria-hidden="true" className='contact__connected-icon' focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
        </div>
      </div>
    )
  }
}

export default Contact
