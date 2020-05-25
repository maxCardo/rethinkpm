import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import qs from 'query-string'
import './style.css'
import { Resizable } from 're-resizable'
import ProfileInfo from './profileInfo/ProfileInfo'
import ProfileList from './profileList/ProfileList'
import ProfileDetails from './profileDetails/ProfileDetails'
import Chat from './profileComms/Chat'
import Loading from '../../core/LoadingScreen/Loading'
import UpdateAlert from "../../core/UpdateAlert";
import { SET_INQUIRIES } from '../../../actions/type'
import {loadBackUpProfile, loadProfileDefault} from '../../../actions/profile'


const Profile = ({profile:{activeProfile, loading }, location:{search}, settings, loadBackUpProfile, loadProfileDefault}) => {

    useEffect(() => {
        //added to allow for reuse of profile component when redux data is orginized by component    
        if(!activeProfile.profile || activeProfile.profileType !== settings.profileType){
            const backUpProfile = qs.parse(search).profile 
            backUpProfile ? loadBackUpProfile(settings.profileType, backUpProfile) : loadProfileDefault(settings.profileType)
        }
    }, [])
    const [chatWindow, tglChatWindow] = useState(false)
    const [listWindow, tglListWindow] = useState(true)
    const tglList = () => tglListWindow(!listWindow)
    const tglChat = () => tglChatWindow(!chatWindow)


    
    return loading ? <Loading/> :
    <Fragment>
            <div className={`agentProfile profile__main-container ${listWindow ? 'left__sidebar-open' : null} ${chatWindow ? 'chat__sidebar-open' : null}`}>
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
                        <ProfileInfo profile={activeProfile} settings={settings} tglChat={tglChat} tglList={tglList}/>
                    </div>
                </Resizable>
                <div className='profile__logs-container'>
                    <ProfileDetails settings={settings}/>
                </div>

            </div>
            <div className='profile__chat-container chat__sidebar'>
                {/* <Chat/> */}
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