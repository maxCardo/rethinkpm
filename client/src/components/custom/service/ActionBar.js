import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import ProfileIcon from '../common/ProfileIcon'
import ActionButtons from './ActionButtons'

export class ActionBar extends Component {
  render() {
    return (
      <div className='action-bar__container'>
        <div className='action-bar__left-side'>
          <div className='action-bar__profile'>
            <ProfileIcon name={this.props.name} />
            <div className='action-bar__profile-data'>
              <p className='action-bar__profile-name'>{this.props.name}</p>
              <p className='action-bar__profile-title'>{this.props.title}</p>
            </div>
          </div>
          <div className='action-bar__action-buttons'>
            <ActionButtons contact={this.props.contact}></ActionButtons>
          </div>
        </div>
        <div className='action-bar__right-side'>
          <div className='action-bar__cta-button'>
            <Button variant='success'>Approve</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ActionBar
