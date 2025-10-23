import {SET_LOADING, SET_LEASELEAD_LIST, SET_LEASELEAD_SMS} from '../actions/type';

const initialState = {
    loading: true,
    list: [],
    sms: {
        list: [],
        loading: true 
    },
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_LEASELEAD_LIST:
            return {
                ...state,
                list: payload,
                loading: false
            }
         case SET_LEASELEAD_SMS:
            return {
                ...state,
                sms: {
                    loading: false,
                    list: payload
                },
            }

        default:
            return state;
    }
}