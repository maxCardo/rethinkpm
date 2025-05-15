import axios from "axios";

import {SET_SHOWCASE_LIST, UNFLAG_PROP, UPDATE_SHOWCASE_SCH, SET_LOADING} from '../type'
import {createSuccessAlert, createErrorAlert} from '../alert'

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };

//@desc: flag property from marketplace component
export const flagProperty = async (id) => {

    console.log('running function to flag peoperty from actions')
    const res = await axios.post(`/api/marketplace/showcase/flagdeal`, {id}, config)
    console.log('res: ', res)
    if (res.status === 200) {
        alert('Record Saved')
    }else if(res.status === 500){
        alert('Error Saving Record')
    }

}

//@desc: unflag properties from showcase component
export const unflag = (prop_id) => async dispatch => {
    console.log('running unflag')
    await axios.delete(`/api/marketplace/showcase/flagdeal/${prop_id}`)
    dispatch({
        type: UNFLAG_PROP,
        payload: prop_id
    })
}

//@desc: get all flaged props deal for showcase comp 
export const getShowcaseData = () => async dispatch => {

    console.log('running get showcase data')
    try {
        const res = await axios.get('/api/marketplace/showcase/showcasedeals')
        console.log('res: ', res)
        dispatch({
            type: SET_SHOWCASE_LIST,
            payload: res.data
        })    
    } catch (err) {
        console.error(err);
    }
}

export const createSchAppt = (data) => async dispatch => {
    try {
        console.log('running create sch appt')
        const res = await axios.post('/api/marketplace/showcase/sch', data, config)
        console.log('res from sch: ', res)
        dispatch({type: SET_LOADING})
        dispatch({
            type: UPDATE_SHOWCASE_SCH,
            payload: res.data.record
        })
        dispatch(createSuccessAlert(`New Appointment Created Issue #${res.task}`, 'Delete Seller Record'))
    } catch (err) {
        dispatch(createErrorAlert('Error: We were unable to create appointment. Please contact Admin'))
        console.log('error on action side')
        console.error(err);
    }
}



