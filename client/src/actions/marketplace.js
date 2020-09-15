import {OPEN_STREET_VIEW, CLOSE_STREET_VIEW, SET_BUYER_PIPELINE} from './type';
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

//request to back end to check update thenbuyers pipeline based on liked properties on the website and resend pipeline data.
export const syncManagedBuyer = (buyer) => async dispatch => {
    try {
        //ToDo: send dispatch to set loading tp true
        //const res = await axios.post('/api/marketplace/pipeline/sync', buyer, config)
        console.log('this was sync managed')
        // dispatch({
        //     type: SET_BUYER_PIPELINE,
        //     payload: data
        // })
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'setManagedBuyer action'))
    }
};

export const getBuyerPipeline =  (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/marketplace/pipeline/${id}`);
        dispatch({
            type: SET_BUYER_PIPELINE,
            payload: res.data
        })    
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Get Buyer Pipeline'))
    }   
}

//change status on pipeline deal to dead
//change status on pipeline deal from recomened to liked

