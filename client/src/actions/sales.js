import axios from 'axios'

import {GET_DEAL} from './type'

export const getDealData = () => async dispatch => {
    try {
        const res = await axios.get('/api/sales/deal_uw/1234')

        dispatch({
            type: GET_DEAL,
            payload: res.data
        });

    } catch (err) {
        console.log("error");
    }
}

export const getDealDataTest = ()  => {
    console.log('deal data test');
}