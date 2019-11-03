import React, { Component } from 'react'

export class Note extends Component {
  render() {
    return (
      <li className='list-group-item'>
        <div className='note__date'>{new Intl.DateTimeFormat().format(this.props.date)}</div>
        <div className='note__text'>{this.props.text}</div>
      </li>
    )
  }
}

export default Note
