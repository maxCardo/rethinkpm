import {SET_LOADING, SET_LEASELEAD_LIST} from '../actions/type';

const initialState = {
    loading: true,
    list: [],
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

        default:
            return state;
    }
}