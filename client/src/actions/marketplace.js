import {OPEN_STREET_VIEW, CLOSE_STREET_VIEW, SET_BUYER_PIPELINE, UPDATE_DEAL_STATUS, SET_PIPELINE_LOADING, SET_AREA_RENTS} from './type';
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
        dispatch({
            type: SET_PIPELINE_LOADING
        })
        const res = await axios.get(`/api/marketplace/pipeline/sync/${buyer}`)
        console.log(res);
        dispatch({
             type: SET_BUYER_PIPELINE,
             payload: res.data
        })
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
export const updateDeal =  (id, action) => async dispatch => {
    try {
        dispatch({
            type: SET_PIPELINE_LOADING
        })
        const data = {
            id,
            action
        }
        const res = await axios.put('/api/marketplace/pipeline/status', data, config)
        console.log(res);
        dispatch({
            type: UPDATE_DEAL_STATUS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Get Buyer Pipeline'))
    }
}

//change status on pipeline deal from recomened to liked
export const likeProperty =  (buyerId, propertyId) => async dispatch => {
    try {
    
        const data = {
            buyerId,
            propertyId
        }
        const res = await axios.post('/api/marketplace/pipeline/like', data, config)
        // get fresh data for pipeline
        getBuyerPipeline(buyerId);
        dispatch({
            type: SET_BUYER_PIPELINE,
            payload: res.data
        })

    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Get Buyer Pipeline'))
    }
}

//change status on pipeline deal from recomened to liked
export const getAreaRents = () => async dispatch => {
    try {
        const res = await axios.get('/api/marketplace/ops/area_rent')
        dispatch({
            type: SET_AREA_RENTS,
            payload: res.data
        })

    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Set area rents'))
    }
}