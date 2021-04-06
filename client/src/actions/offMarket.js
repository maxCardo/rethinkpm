import {SET_SELLER_PIPELINE,OPEN_STREET_VIEW} from './type'
import { createErrorAlert } from "./alert";
import axios from 'axios'

export const getSellerPipeline = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/marketplace/off_market/seller_pipeline/${id}`);
        dispatch({
            type: SET_SELLER_PIPELINE,
            payload: res.data
        })
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Get Seller Pipeline'))
    }
}

export const addUnitSchedule = async (unit) => {
    // const listingId = focusedProperty._id;
    // const data = {
    //     unit
    // }
    // const listingUpdated = (await axios.post(`/api/marketplace/ops/listings/${listingId}/addUnitSch`, data)).data
    // console.log(listingUpdated);
    // //setFocusedProperty(listingUpdated)
}

export const modifyUnitSchedule = async (unit, id) => {
    // const listingId = focusedProperty._id;
    // const data = {
    //     unit,
    //     id
    // }
    // const listingUpdated = (await axios.post(`/api/marketplace/ops/listings/${listingId}/modifyUnitSch`, data)).data
    // console.log(listingUpdated);
    // //setFocusedProperty(listingUpdated)
}

export const deleteUnitSchedule = async (id) => {
    // const listingId = focusedProperty._id;
    // const data = {
    //     id
    // }
    // const listingUpdated = (await axios.post(`/api/marketplace/ops/listings/${listingId}/deleteUnitSch`, data)).data
    // console.log(listingUpdated);
    // //setFocusedProperty(listingUpdated)
}

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
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'openStreetView action'))
    }
}