import { SET_SELLER_PIPELINE, OPEN_STREET_VIEW, DELETE_SELLER_PROPERTY} from './type'
import { createErrorAlert, createSuccessAlert } from "./alert";
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

export const openStreetView = (street, number, zip) => dispatch => {
    console.log(zip);
    try {
        dispatch({
            type: OPEN_STREET_VIEW,
            payload: {
                street: street,
                number: number,
                zip: zip,
                StreetViewModalOpen: true
            }
        });
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'openStreetView action'))
    }
}

//CRUD functionality on offMarket properties

//@desc: delete record from db, adjust user rec array of deals, delete associated compReport
export const deletePropRec = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/marketplace/off_market/seller_pipeline/${id}`);
        console.log('res:', res)
        dispatch({
            type: DELETE_SELLER_PROPERTY,
            payload: id
        })
        dispatch(createSuccessAlert(res.data.msg, 'Delete Seller Record'))
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Could Not Delete Record'))
    }
}