import {OPEN_STREET_VIEW, CLOSE_STREET_VIEW, SET_MANAGED_BUYER, RESET_PROFILE_INFO, SET_ACTIVE_PROFILE} from './type';
import {createErrorAlert} from "./alert";

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
export const setManagedBuyer = buyer => async dispatch => {
    try {
        dispatch({
            type: SET_MANAGED_BUYER,
            payload: buyer
        })
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'setManagedBuyer action'))
    }
};
