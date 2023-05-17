import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_IN_PROGRESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERR0R, LOGOUT } from './type';
import {createErrorAlert} from './alert'

//Load User
export const loadUser = () => async dispatch => {
    try {
        dispatch({
          type: LOGIN_IN_PROGRESS
        })
        const res = await axios.get('/api/users');
        if (!res.data) {
            return dispatch({
                type: AUTH_ERR0R
            })
        }
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERR0R
        });
        
    }
};


//Login User
export const login = (email, password) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}};
    const body = JSON.stringify({ email, password });
    dispatch({
      type: LOGIN_IN_PROGRESS
    })

    try {
        const res = await axios.post('/api/users/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        let errors = err.response.data.errors

        if (errors) {
          console.log(errors)
            errors.forEach(error => dispatch(createErrorAlert(error.msg, 'login')))
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
        console.error(err);
        
        // const errors = err.response.data.errors

        // if (errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        // }
    }
}


// TODO: comment was outdated, remove eslint comment when adding the post
export const register = ({name, email,phone, password}) => async dispatch =>{
    /* eslint-disable no-unused-vars*/
    const body = JSON.stringify({name, email,phone, password});
    const config = {headers:{'Content-Type': 'application/json'}}

    try {
       const res = '' 
       //await axios.post('/api/users', body, config);

       dispatch({
           type: REGISTER_SUCCESS,
           payload: res.data
       })
       
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(createErrorAlert(error, 'login')))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    
    }
}
