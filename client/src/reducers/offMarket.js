import { CLOSE_STREET_VIEW, OPEN_STREET_VIEW, SET_SELLER_PIPELINE, UPDATE_DEAL_STATUS, SET_PIPELINE_LOADING, SET_AREA_RENTS, DELETE_SELLER_PROPERTY, UPDATE_SELLER_PIPELINE } from '../actions/type';
const initialState = {
    loading: true,
    streetViewOpen: false,
    sellerPipeline: [],
    areaRents: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
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
                stzip: payload.zip,
                streetViewOpen: true
            }
        case CLOSE_STREET_VIEW:
            return {
                ...state,
                success: payload,
                loading: false,
                streetViewOpen: false
            }
        case SET_SELLER_PIPELINE:
            return {
                ...state,
                sellerPipeline: payload,
                loading: false
            }
        case UPDATE_DEAL_STATUS:
            return {
                ...state,
                sellerPipeline: state.sellerPipeline.map((deal) => deal._id === payload._id ? { ...deal, status: payload.status } : deal),
                loading: false
            }
        case DELETE_SELLER_PROPERTY:
            return {
                ...state,
                sellerPipeline: state.sellerPipeline.filter(deal => deal._id != payload),
            }
        case SET_AREA_RENTS:
            return {
                ...state,
                areaRents: payload
            }
        case UPDATE_SELLER_PIPELINE:
            return {
                ...state,
                sellerPipeline: state.sellerPipeline.map((deal) => deal._id === payload._id ? payload : deal),
                loading: false
            }

        default:
            return state;
    }
}