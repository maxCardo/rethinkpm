import {CLOSE_STREET_VIEW, OPEN_STREET_VIEW, SET_BUYER_PIPELINE,UPDATE_DEAL_STATUS, SET_PIPELINE_LOADING, SET_AREA_RENTS} from '../actions/type';
const initialState = {
    loading: true,
    streetViewOpen: false,
    buyerPipeline: [],
    areaRents: []
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case SET_PIPELINE_LOADING:
            return {
                ...state,
                loading: true
            }
        case OPEN_STREET_VIEW:
            return {
                ...state,
                ststreet: payload.street,
                stnumber: payload.number,
                streetViewOpen: true
            }
        case CLOSE_STREET_VIEW:
            return {
                ...state,
                success: payload,
                loading: false,
                streetViewOpen: false
            }
        case SET_BUYER_PIPELINE:
            return {
                ...state,
                buyerPipeline: payload,
                loading: false
            }
        case UPDATE_DEAL_STATUS:
            return {
                ...state,
                buyerPipeline: state.buyerPipeline.map((deal) => deal._id === payload._id ? {...deal, status: payload.status } : deal),
                loading: false
            }
        case SET_AREA_RENTS:
            return {
                ...state,
                areaRents: payload
            }

        default:
            return state;
    }
}