import { SET_ACTIVE_PROFILE, PROFILE_ERROR } from '../actions/type';
const initialState = {
    loading:true
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ACTIVE_PROFILE:
            return {
                ...state,
                activeProfile: payload,
                loading:false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}