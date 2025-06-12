import axios from "axios";

import {SET_LEASELEAD_LIST, SET_LOADING} from '../type'
import {createSuccessAlert, createErrorAlert} from '../alert'

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };


//@desc: get all flaged props deal for showcase comp 
export const getLeaseLeadData = () => async dispatch => {

    console.log('running get showcase data')
    try {
        const res = await axios.get('/api/crm/leaselead')
        console.log('res: ', res)
        dispatch({
            type: SET_LEASELEAD_LIST,
            payload: res.data
        })    
    } catch (err) {
        console.error(err);
    }
}

