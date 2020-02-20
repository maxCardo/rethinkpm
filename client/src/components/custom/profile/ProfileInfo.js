import React, { Component } from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux'

export class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const inquiryId = this.props.inquiryId
    let profileInfo
    console.log(inquiryId)
    for(let type in this.props.inquiries) {
      console.log(type)
      profileInfo = this.props.inquiries[type].find((inquiry) => inquiry._id === inquiryId)
      console.log(profileInfo)
      if(profileInfo) {
        break
      } 
    }
    this.setState({profileInfo})
    this.profileInfo = profileInfo
    console.log('Profile info ')
    console.log(profileInfo)

  }
  render() {
    if(!this.state.profileInfo) return ''
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80} />
        </div>
        <div className='profile-info__data-container'>
          <p>Name: {this.state.profileInfo.prospect.name}</p>
          <p>Phone: {this.state.profileInfo.prospect.phone.phoneNumber}</p>
          <p>Email: {this.state.profileInfo.prospect.email}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiries
})


export default connect(mapStateToProps)(ProfileInfo)
