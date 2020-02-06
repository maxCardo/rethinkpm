import React , {Fragment} from 'react';
import {Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'
import {Resizable} from 're-resizable'

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
              <Resizable 
                defaultSize={{
                  height: '400'
                }}
                style={{height: '400', display: 'flex'}}
                minWidth='100%'
                maxHeight={window.innerHeight*(4/6)}
                minHeight='100'
                enable={{
                  top: false,
                  topRight: false,
                  right: false,
                  bottomRight: false, 
                  bottom: true,
                  bottomLeft: false,
                  left: false,
                  topLeft: false
                }}
              >
                <div className='profile__info-container' >
                  <ProfileInfo data={data}/>
                </div>
              </Resizable>
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
