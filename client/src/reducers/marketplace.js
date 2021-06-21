import {CLOSE_STREET_VIEW, OPEN_STREET_VIEW, SET_BUYER_PIPELINE,UPDATE_DEAL_STATUS, SET_PIPELINE_LOADING, SET_AREA_RENTS, SET_OWNER_INFO, SET_FOCUSED_PROPERTY, SET_COMP_LIKE, SET_COMP_UNLIKE, UPDATE_BUYER_PIPELINE, UPDATE_PIPELINE_NOTES} from '../actions/type';
const initialState = {
    loading: true,
    streetViewOpen: false,
    buyerPipeline: [],
    areaRents: [],
    ownerInfo: {
        loading: true,
        data: {}
    },
    focusedProp: {}
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
        case SET_OWNER_INFO:
            return {
                ...state,
                ownerInfo: {
                    loading: false,
                    data: payload
                }
            }  
        case SET_FOCUSED_PROPERTY:
            return {
                ...state,
                focusedProp: payload
            }
        case SET_COMP_LIKE:
            return {
                ...state,
                focusedProp: payload 
            }
        case SET_COMP_UNLIKE:
            return {
                ...state,
                focusedProp: payload
            }
        case UPDATE_BUYER_PIPELINE:
            return {               
                ...state,
                buyerPipeline: state.sellerPipeline.map((deal) => deal._id === payload._id ? payload : deal),
                loading: false
            }
        case UPDATE_PIPELINE_NOTES:
            return {
                ...state,
                focusedProp: {...state.focusedProp, history:payload}
            }    
        default:
            return state;
    }
}