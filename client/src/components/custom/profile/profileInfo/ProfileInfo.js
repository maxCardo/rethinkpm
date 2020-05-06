import React, { useEffect, useState } from 'react'
import ProfileIcon from '../../common/ProfileIcon';
import { connect } from 'react-redux';
import {formatPhone,getData,clearPhoneFormatting,validatePhoneNum,validateEmail} from "../../../../util/commonFunctions";
import commonFormatters from "../../../../util/commonDataFormatters";
import Select from "react-select";
import { agentStatus, trueFalse } from "../../../../util/statusSchemas";
import {Button,Modal,Alert,Form} from "react-bootstrap";

import InfoField from './infoFields/InfoFields'
import Loading from '../../../core/LoadingScreen/Loading'


const ProfileInfo = ({settings:{profileInfo}, profile}) => {
    const [{columns, loading}, setColumns] =useState({data: null, loading: true}) 

    useEffect(() => {
      const columns = {1:[],2:[],3:[]}  
      profileInfo.map((attr) => columns[attr.col].push(attr))   
      setColumns({columns:columns, loading: false})
    },[profile])


    return loading ? <Loading/> :
      <div className='profile-info__main-container'>
        {console.log(columns)}
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80} />
        </div>
        <div className='profile-info__data-container'>
          <div className='column'>
            <div className='column-content'>
              <h2>Personal Info</h2>
              {/* {columns[1].map()} */}
              <div className='Phone'>
                <b>Phone:</b>
                <input
                  type='text'
                  className='invalid'
                  name='phonePrimary'
                  disabled= {true}
                  value= '4125138992'
                //   onChange={(evt) => this.onPrimaryPhoneEdit(evt)}
                //   ref={this.setPhoneInputRef}
                />
                <button
                    className='action-buttons__button singleFieldEdit'
                    // onClick={() => this.editPrimaryPhone()}
                >
                    <i className='fas fa-pencil-alt'></i>
                </button>
                <button
                    className='action-buttons__button ab__confirm singleFieldEdit'
                    disabled='true'
                    // onClick={() => this.confirmPrimaryPhoneEdit()}
                >
                    <i className='fas fa-check'></i>
                </button>
                <button
                    className='action-buttons__button ab__cancel singleFieldEdit'
                    // onClick={() => this.denyPhoneChange()}
                >
                    <i className='fas fa-times'></i>
                </button>
                <button
                  className='action-buttons__button addPhoneNumber'
                //   onClick={() => this.addPhoneNumber()}
                >
                  <i className='fas fa-plus'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='column-content'>
              <h2>Personal Info</h2>
              {columns[1].map((field) => <InfoField field={field} data={profile}/>)}
            </div>
          </div>
          <div className='column'>
            <div className='column-content'>
              <h2>Personal Info</h2>
              <p>col 3 data</p>
            </div>
          </div>
        </div>
        {/* calls to action */}
        <div className='profile-info__actions-container'>
          <a className='action-buttons__button' href='#'>
            <i className='fas fa-user-tag'></i>
          </a>
          <a className='action-buttons__button' href='#'>
            <i className='fas fa-comments'></i>
          </a>
          <a className='action-buttons__button' href={`tel:`}>
            <i className='fas fa-phone'></i>
          </a>
          <a className='action-buttons__button' href={`mailto:`}>
            <i className='fas fa-envelope'></i>
          </a>
          <button className='action-buttons__button edit-profile__button'>
            <i className='fas fa-cogs'></i>
          </button>
        </div>
      </div>
    
    
}



const mapStateToProps = state => ({
   
})



export default connect(mapStateToProps)(ProfileInfo)