import axios from 'axios';

// //Load User
// export const loadUser = () => async dispatch => {
//     if (localStorage.token) {
//         setAuthToken(localStorage.token);
//     }

//     try {
//         const res = await axios.get('/api/auth');
//         dispatch({
//             type: USER_LOADED,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch({
//             type: AUTH_ERROR
//         });
//     }
// };

//Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/user/login', body, config);

        console.log(res);

        // dispatch({
        //     type: LOGIN_SUCCESS,
        //     payload: res.data
        // })
        //dispatch(loadUser());
    } catch (err) {
        console.log(err);
        // const errors = err.response.data.errors

        // if (errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        // }
        // dispatch({
        //     type: LOGIN_FAIL
        // })

    }
}
