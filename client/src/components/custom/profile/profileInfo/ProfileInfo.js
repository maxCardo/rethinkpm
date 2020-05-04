import React, { Component, Fragment } from 'react'
import ProfileIcon from '../../common/ProfileIcon';
import { connect } from 'react-redux';
import {formatPhone,getData,clearPhoneFormatting,validatePhoneNum,validateEmail} from "../../../../util/commonFunctions";
import commonFormatters from "../../../../util/commonDataFormatters";
import Select from "react-select";
import { agentStatus, trueFalse } from "../../../../util/statusSchemas";
import {Button,Modal,Alert,Form} from "react-bootstrap";


const ProfileInfo = (props) => {
    
    console.log('profile info props: ', props);

    return (
        <Fragment>
            <div><p>Profile info</p></div>
        </Fragment>
    )
    
}



const mapStateToProps = state => ({
    
})



export default connect(mapStateToProps)(ProfileInfo)