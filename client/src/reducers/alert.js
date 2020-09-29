import { REMOVE_ALERT, ALERT_SUCCESS, ALERT_FAILURE } from '../actions/type';
const initialState = {};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case ALERT_SUCCESS:
            return {
                ...state,
                success: payload,
                loading: false,
            }
        case ALERT_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        case REMOVE_ALERT:
            return initialState;
        
        default:
            return state;
    }
}