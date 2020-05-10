import React, { Component } from 'react'

export class ActionButtons extends Component {
  render() {
    return (
      <div className='action-buttons__container'>
        <a className='action-buttons__button' href={`tel:${this.props.contact.phone}`}>
          <i className="fas fa-phone"></i>
        </a>
        <button className='action-buttons__button'>
          <i className="fas fa-comments"></i>
        </button>
        <a className='action-buttons__button' href={`mailto:${this.props.contact.email}`}>
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    )
  }
}

export default ActionButtons
