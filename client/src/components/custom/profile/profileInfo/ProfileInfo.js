import React, {useEffect, useRef, useState} from 'react'
import ProfileIcon from '../../common/ProfileIcon';


import InfoField from './infoFields/InfoFields'
import Loading from '../../../core/LoadingScreen/Loading'
import AddPhoneModal from '../edit_add_updated/AddPhoneModal'
import AddEmailModal from "../edit_add_updated/AddEmailModal";


const ProfileInfo = ({settings:{profileInfo}, profile, tglChat, tglList}) => {
    const [{columns, loading}, setColumns] =useState({data: null, loading: true})
    let profileType = useRef('');
    let profileId = useRef('');


    const getPrimaryPhone = profile.phoneNumbers && profile.phoneNumbers.find(item => item.isPrimary)
    const getPrimaryEmail = profile.email && profile.email.find(item => item.isPrimary)
    const primaryPhone = getPrimaryPhone && getPrimaryPhone.number;
    const primaryEmail = getPrimaryEmail && getPrimaryEmail.address;

    useEffect(() => {
        if (profile._id && profileId.current !== profile._id) {
            const columns = {1:[],2:[],3:[]}
            profileInfo.map((attr) => columns[attr.col].push(attr))
            setColumns({columns:columns, loading: false})
            profileId.current = profile._id;
        }
        if (profile.profileType && profileType.current !== profile.profileType) {
            profileType.current = (profile.profileType === 'agentPros') ? 'Agent Info' : (profile.profileType === 'buyerPros') ? 'Buyer Info' : 'Renter Info';
        }
    },[profile, profileInfo])
    
    //ToDo: refactor settings.json to incorperate below lines of code
    const colHeader = ['', profileType.current, 'Profile Info', 'Communication Info']


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
                {columns[col].map((field, index) => <InfoField key={index} passIndex={index} field={field} data={profile} settings={profileInfo} />)}
                </div>
            </div>
          ))}
        </div>

        {/* calls to action */}
        <div className='profile-info__actions-container'>
          <button className='action-buttons__button' onClick={() => tglList()}>
            <i className='fas fa-user-tag'></i>
          </button>
          <button className='action-buttons__button' onClick={()=> tglChat()}>
            <i className='fas fa-comments'></i>
          </button>
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