import React, { Component } from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux';
import { getData } from "../../../util/commonFunctions";


export class ProfileInfo extends Component {
  toggleAgentsMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementsByClassName('profile__main-container')[0].classList.contains('left__sidebar-open')) {
      document.getElementsByClassName('profile__main-container')[0].classList.remove('left__sidebar-open');
    } else {
      document.getElementsByClassName('profile__main-container')[0].classList.add('left__sidebar-open');
    }
  }
  toggleChat(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementsByClassName('profile__main-container')[0].classList.contains('chat__sidebar-open')) {
      document.getElementsByClassName('profile__main-container')[0].classList.remove('chat__sidebar-open');
    } else {
      document.getElementsByClassName('profile__main-container')[0].classList.add('chat__sidebar-open');
    }
  }

  render() {
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80} />
        </div>
        <div className='profile-info__data-container'>
          {this.props.attributes.map((attribute) => {
            return (<p>{attribute.name}: {getData(this.props.inquiry, attribute)}</p>)
          })}
        </div>
        <div className="profile-info__actions-container">
          {this.props.isAgent ?
            (
              <a className='action-buttons__button' href='#' onClick={this.toggleAgentsMenu}>
              <i className="fas fa-user-tag"></i>
            </a>
            ) : ''}

          <a className='action-buttons__button' href='#' onClick={this.toggleChat}>
            <i className="fas fa-comments"></i>
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})


export default connect(mapStateToProps)(ProfileInfo)
