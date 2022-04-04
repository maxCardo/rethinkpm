import { SET_LOADING ,SET_FILTERED_DATA, REMOVE_SCANNER_ITEM, UPDATE_SCANNER_ITEM, SET_FILTER_OPTIOINS, SET_FILTER, SET_SELECTED_FILTER, SET_SAVED_FILTERS, SET_SELECTED_ITEM} from '../actions/type'

const initialState = {
    loading: true,
    list: [],
    savedFilters: [],
    filterOptions: [],
    activeFilter: [],
    selected: null,
    selectedData: []
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_FILTERED_DATA:
            return {
                ...state,
                list: payload,
                selected: null,
                activeFilter: [],
                selectedData: [],
                loading: false
            }
        case REMOVE_SCANNER_ITEM:
            return {
                ...state,
                list: state.list.filter(item => payload.indexOf(item._id) === -1),
                loading: false
            }
        case UPDATE_SCANNER_ITEM:
            return {
                ...state,
                list: state.list.map(item => item._id === payload._id ? payload : item),
                loading: false
            }

        case SET_FILTER_OPTIOINS:
            return {
                ...state, 
                filterOptions: payload,
            }

        case SET_FILTER:
            return {
                ...state,
                list: payload.record, 
                activeFilter: payload.filters,
                selectedData: [],
                loading: false
            }
        
        case SET_SAVED_FILTERS:
            return {
                ...state,
                savedFilters: payload, 
            }
        case SET_SELECTED_FILTER:
            return {
                ...state,
                selected: payload, 
            }
        case SET_SELECTED_ITEM:
            return {
                ...state,
                selectedData: payload, 
            }
                       
        default:
            return state
    }

}