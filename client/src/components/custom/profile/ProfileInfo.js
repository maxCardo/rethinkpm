import React, { Component } from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux'

export class ProfileInfo extends Component {
  render() {
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80} />
        </div>
        <div className='profile-info__data-container'>
          <p>Name: {this.props.inquiry.prospect.name}</p>
          <p>Phone: {this.props.inquiry.prospect.phone.phoneNumber}</p>
          <p>Email: {this.props.inquiry.prospect.email}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})


export default connect(mapStateToProps)(ProfileInfo)
