import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERR0R, LOGOUT} from '../actions/type';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        case LOGIN_FAIL:
        case AUTH_ERR0R:
        case LOGOUT:    
            return {
                ...state,
                isAuthenticated: false,
                loading:false
            };

        default:
            return state;
    }
}