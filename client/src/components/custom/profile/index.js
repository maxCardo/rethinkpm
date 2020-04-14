import React , {Fragment, Component} from 'react';
import { withRouter } from 'react-router-dom';
import ProfileInfo from './ProfileInfo'
import {Resizable} from 're-resizable'
import axios from 'axios';
import {connect} from 'react-redux'
import { SET_INQUIRIES } from '../../../actions/type'

import './style.css'
import ProfileChat from './ProfileChat';
import ProfileTables from './ProfileTables';
import NotesScreen from './screens/Notes'
import BottomNavigation from '../service/BottomNavigation';


export class Profile extends Component {
  componentDidMount() {
    if(this.props.inquiries) return;
    axios.get('/api/rent_lead/open_leads').then((res) => {
      const properties = new Set()
      const data = {
        upcoming: [],
        engaged: [],
        cold: [],
        scheduled: [],
        toured: [],
        application: [],
        new: [],
      }
      res.data.forEach((lead) => {
        properties.add(lead.listing)
        data[lead.status.currentStatus].push(lead)
      })
      this.props.setInquiries({inquiries: data, inquiriesRaw: res.data})
    })
  }
  render() {
    if(!this.props.inquiries) return ''
    const {id} = this.props.match.params
    const inquiry = this.props.inquiries.find((inquiry) => inquiry._id === id)
    const screens = {
      notes: (profile) => ({
        route: 'notes',
        display: 'Notes',
        component: <NotesScreen profile={profile} />,
      })
    }
    const screensSelected = this.props.screens.map((screenName) => (screens[screenName](inquiry)))
    return (
        <Fragment>
          <div className='profile__main-container'>
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
                  <ProfileInfo inquiry={inquiry} attributes={this.props.attributes} />
                </div>
              </Resizable>
              <div className='profile__logs-container'>
                <BottomNavigation screens={screensSelected}/>
              </div>
            </div>
            <div className='profile__chat-container'>
              <ProfileChat inquiryId={id}/>
            </div>
          </div>
        </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})

const mapDispatchToProps = dispatch => {
  return {
    setInquiries:(inquiries) => dispatch({type: SET_INQUIRIES, payload: inquiries})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))