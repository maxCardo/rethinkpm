import React, { useEffect, useState } from 'react'
import ProfileIcon from '../../common/ProfileIcon';


import InfoField from './infoFields/InfoFields'
import Loading from '../../../core/LoadingScreen/Loading'
import AddPhoneModal from '../edit_add_updated/AddPhoneModal'
import AddEmailModal from "../edit_add_updated/AddEmailModal";


const ProfileInfo = ({settings:{profileInfo}, profile, tglChat, tglList}) => {
    const [{columns, loading}, setColumns] =useState({data: null, loading: true}) 

    const getPrimaryPhone = profile.phoneNumbers && profile.phoneNumbers.find(item => item.isPrimary)
    const getPrimaryEmail = profile.email && profile.email.find(item => item.isPrimary)
    const primaryPhone = getPrimaryPhone && getPrimaryPhone.number;
    const primaryEmail = getPrimaryEmail && getPrimaryEmail.address;

    useEffect(() => {
      const columns = {1:[],2:[],3:[]}  
      profileInfo.map((attr) => columns[attr.col].push(attr))   
      setColumns({columns:columns, loading: false})
    },[profile, profileInfo])
    
    //ToDo: refactor settings.json to incorperate below lines of code
    const colHeader = ['', 'Personal Info', 'Profile Info', 'Commumication Info']


    return loading ? <Loading/> :
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80} />
        </div>
        <div className='profile-info__data-container'>
          {Object.keys(columns).map((col, index) => (
            <div className='column' key={index}>
              <div className='column-content'>
                <h2>{colHeader[col]}</h2>
                {columns[col].map((field, index) => <InfoField key={index} passIndex={index} field={field} data={profile} />)}
                </div>
            </div>
          ))}
        </div>

        {/* calls to action */}
        <div className='profile-info__actions-container'>
          <a className='action-buttons__button' href='#' onClick={() => tglList()}>
            <i className='fas fa-user-tag'></i>
          </a>
          <a className='action-buttons__button' href='#' onClick={()=> tglChat()}>
            <i className='fas fa-comments'></i>
          </a>
          <a className='action-buttons__button' href={`tel:${primaryPhone}`}>
            <i className='fas fa-phone'></i>
          </a>
          <a className='action-buttons__button' href={`mailto:${primaryEmail}`}>
            <i className='fas fa-envelope'></i>
          </a>
          <button className='action-buttons__button edit-profile__button'>
            <i className='fas fa-cogs'></i>
          </button>
        </div>
          {/* modals */}
        <AddPhoneModal/>
        <AddEmailModal/>
      </div>
    
    
}


export default ProfileInfo