import React, { Component } from 'react'

export class Note extends Component {
  render() {
    console.log(this.props.content)
    return (
      <li className='list-group-item'>
        <div className='note__date'>{new Intl.DateTimeFormat().format(new Date(this.props.date))}</div>
        <div className='note__text'>{this.props.content}</div>
      </li>
    )
  }
}

export default Note
