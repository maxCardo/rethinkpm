import {SET_LOADING, SET_SHOWCASE_LIST, UNFLAG_PROP, UPDATE_SHOWCASE_SCH} from '../actions/type';
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
        case SET_SHOWCASE_LIST:
            return {
                ...state,
                list: payload,
                loading: false
            }
        case UNFLAG_PROP: 
            return {
                ... state,
                list : state.list.filter(prop => prop._id != payload)
            }
        case UPDATE_SHOWCASE_SCH:
            return {
                ...state,
                list: state.list.map(item => item._id === payload._id ? payload : item),
                loading: false
            }

        default:
            return state;
    }
}