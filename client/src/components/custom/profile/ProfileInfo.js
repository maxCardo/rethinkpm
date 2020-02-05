import React, { Component } from 'react'
import ProfileIcon from '../common/ProfileIcon';

export class ProfileInfo extends Component {
  render() {
    const {name, phone, email} = this.props.data
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={name} size={80} />
        </div>
        <div className='profile-info__data-container'>
          <p>Name: {name}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    )
  }
}

export default ProfileInfo
