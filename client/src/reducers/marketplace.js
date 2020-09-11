import {CLOSE_STREET_VIEW, OPEN_STREET_VIEW, SET_MANAGED_BUYER} from '../actions/type';
const initialState = {streetViewOpen: false};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case OPEN_STREET_VIEW:
            return {
                ...state,
                ststreet: payload.street,
                stnumber: payload.number,
                streetViewOpen: true
            }
        case CLOSE_STREET_VIEW:
            return {
                ...state,
                success: payload,
                loading: false,
                streetViewOpen: false
            }
        case SET_MANAGED_BUYER:
            return {
                ...state,
                managedBuyer: payload,
                loading: false
            };

        default:
            return state;
    }
}