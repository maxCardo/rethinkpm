import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router';
import ProfileInfo from './profileInfo/ProfileInfo'
import { Resizable } from 're-resizable'
import axios from 'axios';
import { connect } from 'react-redux'
import { AGENT_SELECTED, SET_INQUIRIES } from '../../../actions/type'

import './style.css'
import ProfileChat from './ProfileChat';
import BottomNavigation from '../service/BottomNavigation';
import AgentList from "../BrokerDashboard/AgentList/AgentList";
import Loading from '../../core/LoadingScreen/Loading'

import NotesScreen from './screens/Notes'
import SalesScreen from './screens/SalesHistory'

const Profile = ({isAgent, profile:{activeProfile, loading }}) => {

    return loading ? <Loading/> :
    <Fragment>
        <div className={isAgent ? 'agentProfile profile__main-container left__sidebar-open' : 'profile__main-container'}>
            <div className='profile__left-container'>
                <div className='profile__info-container'>
                    <ProfileInfo/>
                </div>
                <div className='profile__logs-container'>
                    <p>logs container</p>
                </div>

            </div>
            <div className='profile__chat-container chat__sidebar'>
                <p>chat sidebar</p>
            </div>
            <div className="sidebar__left profile__agent-leads">
                <p>profiles sidebar</p>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile)))