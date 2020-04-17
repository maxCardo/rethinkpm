import React , {Fragment, Component} from 'react';
import { withRouter } from 'react-router';
import ProfileInfo from './ProfileInfo'
import {Resizable} from 're-resizable'
import axios from 'axios';
import {connect} from 'react-redux'
import {AGENT_SELECTED, SET_INQUIRIES} from '../../../actions/type'

import './style.css'
import ProfileChat from './ProfileChat';
import BottomNavigation from '../service/BottomNavigation';
import AgentList from "../BrokerDashboard/AgentList";

import NotesScreen from './screens/Notes'
import SalesScreen from './screens/SalesHistory'


export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: undefined
    }
  }
  componentDidMount() {
    const {id} = this.props.match.params
    axios.get(`${this.props.endpoint}/${id}`).then((res) => {
      this.setState({profile: res.data})
    })
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      const {id} = this.props.match.params

      if (this.props.isAgent) {
        axios.get(`/api/profile/agent/${this.props.match.params.id}`).then((res) => {
          let agentWithSales = res.data;
          this.setState({profile: agentWithSales});
        })
          .then((res) => {
            this.setState({loadingAgent: false});
          });
      }
    }
  }

  render() {
    if(!this.state.profile) return ''
    const screens = {
      notes: (profile) => ({
        route: 'notes',
        display: 'Notes',
        component: <NotesScreen profile={profile} />,
      }),
      sales: (profile) => ({
        route: 'sales',
        display: 'Sales',
        component: <SalesScreen profile={profile} />,
      })
    }
    const screensSelected = this.props.screens.map((screenName) => (screens[screenName](this.state.profile)))
    return (
        <Fragment>
          <div className={this.props.isAgent ? 'agentProfile profile__main-container' : 'profile__main-container'}>
            <div className='profile__left-container'>
              <Resizable 
                defaultSize={{
                  height: '300'
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
                  <ProfileInfo inquiry={this.state.profile} attributes={this.props.attributes} isAgent={this.props.isAgent} />
                </div>
              </Resizable>
              <div className='profile__logs-container'>
                <BottomNavigation screens={screensSelected}/>
              </div>
            </div>
            <div className='profile__chat-container chat__sidebar'>
              <ProfileChat inquiryId={this.state.profile._id}/>
            </div>
            {this.props.isAgent ? (
              <div className="sidebar__left profile__agent-leads">
                <AgentList agents={this.props.listData} />
              </div>
            ) : ''}
          </div>
        </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw,
  agentSelected: state.brokerDashboard.agentSelected
})

const mapDispatchToProps = dispatch => {
  return {
    setInquiries:(inquiries) => dispatch({type: SET_INQUIRIES, payload: inquiries}),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile)))