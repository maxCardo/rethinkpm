import { GET_DEAL } from '../actions/type';

const initialState = {
    deal: {
        test: 'test'
    },
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DEAL:
            return {
                ...state,
                deal: payload,
                loading: false
            }
        default:
            return state;
    }
}