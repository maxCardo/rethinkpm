import React, { Fragment, useEffect } from 'react';
import qs from 'query-string'
import { connect } from 'react-redux'

import './style.css'
import ProfileInfo from './profileInfo/ProfileInfo'
import ProfileList from './profileList/ProfileList'
import { Resizable } from 're-resizable'
import Loading from '../../core/LoadingScreen/Loading'
//import NotesScreen from './screens/Notes'
//import SalesScreen from './screens/SalesHistory'

//removed AGENT_SELECTED
import { SET_INQUIRIES } from '../../../actions/type'
import {loadBackUpProfile, loadProfileDefault} from '../../../actions/profile'
import UpdateAlert from "../../core/UpdateAlert";

//ToDo: action.addPhoneNumSubmit : 
    // - remove toggle dispactch 
    // - check that phone num is not already included in record, if in send msg 
    // - send put call to API to add phoneNum


const Profile = ({profile:{activeProfile, loading }, location:{search}, settings, loadBackUpProfile, loadProfileDefault}) => {

    var isAgent = true

    //run on load only
    useEffect(() => {
        //added to allow for reuse of profile component when redux data is orginized by component    
        if(!activeProfile.profile || activeProfile.profileType !== settings.profileType){
            const backUpProfile = qs.parse(search).profile 
            backUpProfile ? loadBackUpProfile(settings.profileType, backUpProfile) : loadProfileDefault(settings.profileType)
        }
    }, [activeProfile.profile, activeProfile.profileType, loadBackUpProfile, loadProfileDefault, search, settings.profileType])
    
    return loading ? <Loading/> :
    <Fragment>
        {/* update conditional statment below to use setting.json*/}
        <div className={isAgent ? 'agentProfile profile__main-container left__sidebar-open' : 'profile__main-container'}>
            <div className='profile__left-container'>
                <Resizable defaultSize={{height: '400'}}style={{height: '400', display: 'flex'}} minWidth='100%' maxHeight={window.innerHeight*(4/6)} minHeight='100'
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
                    <div className='profile__info-container'>
                        <ProfileInfo profile={activeProfile} settings={settings}/>
                    </div>
                </Resizable>
                <div className='profile__logs-container'>
                    <p>logs container</p>
                </div>

            </div>
            <div className='profile__chat-container chat__sidebar'>
                <p>chat sidebar</p>
            </div>
            <div className="sidebar__left profile__agent-leads">
                <ProfileList settings={settings}/>
            </div>
        </div>
        <UpdateAlert  />
    </Fragment>
}


const mapStateToProps = state => ({
    inquiries: state.dashboard.inquiriesRaw,
    agents: state.brokerDashboard,
    profile: state.profile
})

const mapDispatchToProps = dispatch => {
    return {
        setInquiries: (inquiries) => dispatch({ type: SET_INQUIRIES, payload: inquiries }),
    }
}


export default connect(mapStateToProps, {...mapDispatchToProps, loadProfileDefault, loadBackUpProfile})(Profile)