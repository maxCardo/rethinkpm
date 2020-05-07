import { SET_ACTIVE_PROFILE, PROFILE_ERROR, TOGGLE_ADD_PHONE } from '../actions/type';
const initialState = {
    activeProfile:'',
    loading:true,
    showAddPhoneMod: false
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
        case TOGGLE_ADD_PHONE:
            return {
                ...state,
                showAddPhoneMod: payload,
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