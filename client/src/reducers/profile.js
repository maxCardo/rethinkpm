import {
    SET_ACTIVE_PROFILE,
    PROFILE_ERROR,
    TOGGLE_ADD_PHONE,
    TOGGLE_ADD_EMAIL,
    SET_PROFILE_LIST,
    CLEAR_PROFILE_ERROR,
    PROFILE_SUCCESS,
    CLEAR_PROFILE_SUCCESS
} from '../actions/type';

const initialState = {
    activeProfile: '',
    loading: true,
    showAddPhoneMod: false,
    profileList: {list: '', loading: true}
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_ACTIVE_PROFILE:
            return {
                ...state,
                activeProfile: payload,
                loading: false
            };
        case SET_PROFILE_LIST:
            return {
                ...state,
                profileList: {
                    list: payload,
                    loading: false
                },
            }
        case TOGGLE_ADD_PHONE:
            return {
                ...state,
                showAddPhoneMod: payload,
            };
        case TOGGLE_ADD_EMAIL:
            return {
                ...state,
                showAddEmailMod: payload,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE_ERROR:
            return {
                ...state,
                error: '',
            }
        case PROFILE_SUCCESS:
            return {
                ...state,
                success: payload,
                loading: false,
            }
        case CLEAR_PROFILE_SUCCESS:
            return {
                ...state,
                success: '',
            }
        default:
            return state;
    }
}