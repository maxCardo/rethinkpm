import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {clearAlerts} from "../../actions/profile";

import {Alert} from "react-bootstrap";


const UpdateAlert = ({error, success, clearAlerts}) => {
    let msg = null;
    if (error) {
        msg = {...error};
        msg.className='invalidAlert';
        msg.variant='danger'
    } else if (success) {
        msg = {...success};
        msg.className='validAlert';
        msg.variant='success';
    }

    if(msg) {
      console.log(`Alert produced in ${msg.location}`)
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                clearAlerts();
            }, 1000)
        }
    });
    
    if (error || success) {
        return (
          <div className="alert-container" onClick={clearAlerts}>
            <Alert className={`${msg.className} fade`} variant={msg.variant} show={true} onClose={clearAlerts} dismissible={!!error}>
              <Alert.Heading>{msg.heading && msg.heading}</Alert.Heading>
              <p>{msg.msg}</p>
            </Alert>
          </div>
        );
    } else {
        return null
    }

};

const mapStateToProps = state => ({
    error: state.alert.error,
    success: state.alert.success
});

UpdateAlert.propTypes = {
    clearAlerts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {clearAlerts})(UpdateAlert)