import axios from 'axios';
import { SET_ACTIVE_PROFILE, PROFILE_ERROR } from './type';
import { setAlert } from './alert';

//Set Active profile for selected lead record. 
export const setActiveProfile = profile => async dispatch => {
    try {
        console.log('running set active profile');
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: profile
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
};