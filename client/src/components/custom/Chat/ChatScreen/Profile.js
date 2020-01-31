import React, { Component } from 'react'
import ProfileIcon from '../common/ProfileIcon'
import Note from './Note'

export class Profile extends Component {
  render() {
    return (
      <div className='profile__container'>
        <div className='profile__name-container'>
          <ProfileIcon name={this.props.name} size={80} />
          <div className='profile__name'>{this.props.name}</div>
        </div>
        <ul className='profile__notes-container list-group'>
          {this.props.notes.map((note) => (
            <Note date={note.date} text={note.text} />
          ))}
          <a className='profile__add-note' href='#'>Add note</a>
        </ul>
      </div>
    )
  }
}

export default Profile
