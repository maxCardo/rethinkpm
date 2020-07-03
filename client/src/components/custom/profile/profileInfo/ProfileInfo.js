import React, {useEffect, useRef, useState} from 'react'

import ProfileIcon from '../../common/ProfileIcon';
import InfoField from './infoFields/InfoFields'
import Loading from '../../../core/LoadingScreen/Loading'
import AddPhoneModal from './AddPhoneModal'
import AddEmailModal from './AddEmailModal'

//ToDo: in rentpros , pets not showing on ui. 

const ProfileInfo = ({settings: {profileInfo, profileNamePlural}, profile, tglChat, tglList, tglEdit, tglAdd}) => {
    const [{columns, loading}, setColumns] = useState({data: null, loading: true});

    let profileId = useRef('');
    let profileName = profileNamePlural.slice(0, -1);

    const getPrimaryPhone = profile.phoneNumbers && profile.phoneNumbers.find(item => item.isPrimary)
    const getPrimaryEmail = profile.email && profile.email.find(item => item.isPrimary)
    const primaryPhone = getPrimaryPhone && getPrimaryPhone.number;
    const primaryEmail = getPrimaryEmail && getPrimaryEmail.address;

    useEffect(() => {
        if (profile._id && profileId.current !== profile._id) {
            const columns = {1: [], 2: [], 3: []}
            profileInfo.map((attr) => columns[attr.col].push(attr))
            setColumns({columns: columns, loading: false})
            profileId.current = profile._id;
        }

    }, [profile])

    //ToDo: refactor settings.json to incorperate below lines of code
    const colHeader = ['', `${profileName} Info`, 'Profile Info', 'Communication Info']


    return loading ? <Loading/> :
        <div className='profile-info__main-container'>
            <div className='profile-info__icon-container'>
                <ProfileIcon name={'Tests'} size={80}/>
            </div>
            <div className='profile-info__data-container'>
                {Object.keys(columns).map((col, index) => (
                    <div className='column' key={index}>
                        <div className='column-content'>
                            <h2>{colHeader[col]}</h2>
                            {columns[col].map((field, index) => (
                              <InfoField key={index} passIndex={index} field={field} data={profile} settings={profileInfo}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* calls to action */}
            <div className='profile-info__actions-container'>
                <button className='action-buttons__button' onClick={() => tglList()}>
                    <i className='fas fa-user-tag'></i>
                </button>
                <button className='action-buttons__button' onClick={() => tglChat()}>
                    <i className='fas fa-comments'></i>
                </button>
                <a className='action-buttons__button' href={`tel:${primaryPhone}`}>
                    <i className='fas fa-phone'></i>
                </a>
                <a className='action-buttons__button' href={`mailto:${primaryEmail}`}>
                    <i className='fas fa-envelope'></i>
                </a>

                <button className='action-buttons__button edit-profile__button' onClick={() => tglEdit()}>
                    <i className='fas fa-cogs'></i>
                </button>

            </div>
            {/* modals */}
            <AddPhoneModal/>
            <AddEmailModal/>
        </div>

}


export default ProfileInfo