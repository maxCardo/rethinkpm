import React , {Fragment, Component} from 'react';
import {Link, useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'
import {Resizable} from 're-resizable'
import axios from 'axios';
import {connect} from 'react-redux'
import { SET_INQUIRIES } from '../../../actions/type'

import './style.css'
import ProfileChat from './ProfileChat';
import ProfileTables from './ProfileTables';

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
                  <ProfileInfo inquiry={inquiry}/>
                </div>
              </Resizable>
              <div className='profile__logs-container'>
                <ProfileTables inquiry={inquiry}/>
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