import { CLOSE_STREET_VIEW, OPEN_STREET_VIEW } from '../actions/type';
const initialState = {streetViewOpen: false};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case OPEN_STREET_VIEW:
            return {
                ...state,
                success: payload,
                loading: false,
                streetViewOpen: true
            }
        case CLOSE_STREET_VIEW:
            return {
                ...state,
                success: payload,
                loading: false,
                streetViewOpen: false
            }

        default:
            return state;
    }
}