import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import qs from 'query-string'
import { withRouter } from 'react-router';
import { connect } from 'react-redux'

import './style.css'
import ProfileInfo from './profileInfo/ProfileInfo'
import { Resizable } from 're-resizable'
import ProfileChat from './ProfileChat';
import BottomNavigation from '../service/BottomNavigation';
import AgentList from "../BrokerDashboard/AgentList/AgentList";
import Loading from '../../core/LoadingScreen/Loading'
import NotesScreen from './screens/Notes'
import SalesScreen from './screens/SalesHistory'

import { AGENT_SELECTED, SET_INQUIRIES } from '../../../actions/type'
import {loadBackUpProfile, loadProfileDefault} from '../../../actions/profile'


const Profile = ({profile:{activeProfile, loading }, location:{search}, settings:{profileType}, loadBackUpProfile, loadProfileDefault}) => {

    var isAgent = true

    //run on load only
    useEffect(() => {
        if(!activeProfile){
            const backUpProfile = qs.parse(search).profile 
            backUpProfile ? loadBackUpProfile(profileType, backUpProfile) : loadProfileDefault(profileType)
        }
    
    }, [])

    
    return loading ? <Loading/> :
    <Fragment>
        <div className={isAgent ? 'agentProfile profile__main-container left__sidebar-open' : 'profile__main-container'}>
            <div className='profile__left-container'>
                <div className='profile__info-container'>
                    <ProfileInfo profile={activeProfile}/>
                </div>
                <div className='profile__logs-container'>
                    <p>logs container</p>
                </div>

            </div>
            <div className='profile__chat-container chat__sidebar'>
                <p>chat sidebar</p>
            </div>
            <div className="sidebar__left profile__agent-leads">
                {/* <AgentList/> */}
                <p>agent list placeholder</p>

            </div>
        </div>
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


export default connect(mapStateToProps, {loadProfileDefault, loadBackUpProfile})(Profile)