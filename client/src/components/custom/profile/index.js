import React , {Fragment} from 'react';
import {Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'

import './style.css'
import ProfileChat from './ProfileChat';
import ProfileTables from './ProfileTables';

const Profile = props => {
    const {id} = useParams()
    const data = {
      name: 'Oscar Rodriguez',
      phone: '(412) 880-3806',
      email: 'lagartoverde97@gmail.com'
    }
    return (
        <Fragment>
          <div className='profile__main-container'>
            <div className='profile__left-container'>
              <div className='profile__info-container'>
                <ProfileInfo data={data}/>
              </div>
              <div className='profile__logs-container'>
                <ProfileTables />
              </div>
            </div>
            <div className='profile__chat-container'>
              <ProfileChat inquiryId={id}/>
            </div>
          </div>
        </Fragment>
    )
}

Profile.propTypes = {

}

export default Profile
