import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERR0R, LOGOUT } from './type';
import { setAlert } from './alert';

//Load User
export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');
        if (!res.data) {
            console.log('no user found')
            return dispatch({
                type: AUTH_ERR0R
            })
        }
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log('auth error')
        dispatch({
            type: AUTH_ERR0R
        });
        console.error('error');
        
    }
};


//Login User
export const login = (email, password) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}};
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/users/login', body, config);
        console.log(res)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        let errors = err.response.data.errors
        console.log(errors);

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })

    }
}

//Logout User
export const logout = () => async dispatch => {
    try {
        await axios.post('/api/users/logout');
        dispatch({type:LOGOUT});
    } catch (err) {
        console.log('fire eroor on logout')
        console.error(err);
        
        // const errors = err.response.data.errors

        // if (errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        // }
    }
}
