import {OPEN_STREET_VIEW, CLOSE_STREET_VIEW, SET_MANAGED_BUYER, RESET_PROFILE_INFO, SET_ACTIVE_PROFILE} from './type';
import {createErrorAlert} from "./alert";
import axios from "axios";

const config = {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};

export const openStreetView = (street, number) => dispatch => {


    try {
        dispatch({
            type: OPEN_STREET_VIEW,
            payload: {
                street: street,
                number: number,
                StreetViewModalOpen: true
            }
        });
    } catch(err) {
        dispatch(createErrorAlert(err.message, 'openStreetView action'))
    }
}

export const closeStreetView = () => dispatch => {
    try {
        dispatch({
            type: CLOSE_STREET_VIEW,
            payload: {
                street: '',
                number: '',
                StreetViewModalOpen: false
            }
        });
    } catch(err) {
        dispatch(createErrorAlert(err.message, 'closeStreetView action'))
    }
}

//Set Active profile for selected lead record.
export const syncManagedBuyer = (buyer) => async dispatch => {
    try {
        const res = await axios.post('/api/profile/buyerPros/pipeline/sync', buyer, config);
        console.log(res.data)
        console.log('this was sync managed')

        const data = {...res.data}
        // dispatch({
        //     type: SET_MANAGED_BUYER,
        //     payload: data
        // })
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'setManagedBuyer action'))
    }
};

