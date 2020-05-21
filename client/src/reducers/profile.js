import {
    SET_ACTIVE_PROFILE,
    PROFILE_ERROR,
    TOGGLE_ADD_PHONE,
    TOGGLE_ADD_EMAIL,
    SET_PROFILE_LIST,
    CLEAR_PROFILE_ERROR,
    PROFILE_SUCCESS,
    CLEAR_PROFILE_SUCCESS,
    LOAD_PROFILE_LIST,
    PROFILE_FILTER_OPTIONS,
    SET_FILTER,
    SET_SAVED_FILTERS,
    PROFILE_PAST_SALES
} from '../actions/type';

const initialState = {
    activeProfile: {
        notes: []
    },
    loading: true,
    showAddPhoneMod: false,
    profileList: {list: '', loading: true},
    filterOptions: {options:'', loading:true},
    activeFilter:[],
    savedFilters:[],
    pastSales: {
        loading: true
    }
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
        case PROFILE_PAST_SALES:
            return {
                ...state,
                pastSales:{
                    ...payload,
                    loading:false
                }
            }
        case SET_PROFILE_LIST:
            return {
                ...state,
                profileList: {
                    list: payload,
                    loading: false
                },
            }
        case LOAD_PROFILE_LIST:
            return {
                ...state,
                profileList: {
                    loading: true
                },
                activeFilter:[]
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
        case PROFILE_FILTER_OPTIONS:
            return {
                ...state,
                filterOptions: {
                    ...payload, 
                    loading:false
                }
            };
        case SET_FILTER:
            return {
                ...state,
                activeFilter: payload
            };
        case SET_SAVED_FILTERS:
            return {
                ...state,
                savedFilters: payload
            }    

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