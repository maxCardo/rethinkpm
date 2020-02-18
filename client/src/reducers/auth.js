import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERR0R, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_IN_PROGRESS} from '../actions/type';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false,
                loginInProgress: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                loginInProgress: false
            };
        case LOGIN_IN_PROGRESS:
            console.log('login')
            return {
              ...state,
              loginInProgress: true
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:    
        case AUTH_ERR0R:
        case LOGOUT:    
            return {
                ...state,
                isAuthenticated: false,
                loading:false,
                loginInProgress: false
            };

        default:
            return state;
    }
}