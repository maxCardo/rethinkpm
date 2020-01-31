import React, { Component } from 'react'

export class TopBar extends Component {
  render() {
    const statusColors = {
      'connected': '#00C851',
      'disconnected': '#CCC',
    }
    return (
      <div className='chat__top-bar' onClick={this.props.onClick}>
        {this.props.status &&
          <svg style={{color: statusColors[this.props.status]}} aria-hidden="true" className='chat__top-bar-connectedIcon' focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
        }
        {this.props.name}
        {this.props.onClose &&
          <div className='chat__close-icon-container' onClick={this.props.onClose}>
            <svg className='chat__close-icon' aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </div>
        }
      </div>
    )
  }
}

export default TopBar
