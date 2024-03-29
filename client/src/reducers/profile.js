import {
    SET_ACTIVE_PROFILE,
    PROFILE_ERROR,
    TOGGLE_ADD_PHONE,
    TOGGLE_ADD_EMAIL,
    TOGGLE_ADD_LEAD,
    SET_PROFILE_LIST,
    ADD_DATA_PROFILE_LIST,
    CLEAR_PROFILE_ERROR,
    PROFILE_SUCCESS,
    CLEAR_PROFILE_SUCCESS,
    LOAD_PROFILE_LIST,
    PROFILE_FILTER_OPTIONS,
    SET_FILTER,
    SET_SAVED_FILTERS,
    PROFILE_PAST_SALES,
    SET_ACTIVE_PROFILE_CHAT,
    LOAD_MORE_PROFILE_LIST,
    SET_HAS_MORE_DATA,
    UPDATE_ACTIVE_PROFILE_CHAT,
    START_LOADING_PROFILE_CHAT,
    START_LOADING_PROFILE,
    RESET_PROFILE_INFO,
    LOAD_PROFILE_TABLE_VIEW,
    SET_PROFILE_TABLE_VIEW,
    LOAD_PROFILE_LIST_AND_TABLE,
    STOP_LOAD_PROFILE_LIST_AND_TABLE,
    UPDATE_PROFILE,
} from '../actions/type';

const initialState = {
    activeProfile: {
        notes: []
    },
    loading: true,
    showAddPhoneMod: false,
    profileList: {list: '', loading: true},
    filterOptions: {options:'', loading:true},
    activeFilter:[],
    savedFilters:[],
    pastSales: {
        loading: true
    },
    activeChat:{
        chat: {},
        loading: true,
    }
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case RESET_PROFILE_INFO:
          return {
            ...initialState,
            profileList: state.profileList,
            filterOptions: state.filterOptions,
            activeFilter:state.activeFilter,
            isFiltered: state.isFiltered,
            activeProfile: state.activeProfile
          };
        case START_LOADING_PROFILE:
          return {
            ...state,
            loading: true
          }
          case LOAD_PROFILE_LIST_AND_TABLE:
          return {
            ...state,
            profileList: {
                ...state.profileList,
                loadingTableView: true,
                loading: true
            },
          }
        case STOP_LOAD_PROFILE_LIST_AND_TABLE:
          return {
            ...state,
            profileList: {
                ...state.profileList,
                loadingTableView: false,
                loading: false
            },
          }
        case SET_ACTIVE_PROFILE:
            return {
                ...state,
                activeProfile: payload,
                loading: false
            };
        case PROFILE_PAST_SALES:
            return {
                ...state,
                pastSales:{
                    ...payload,
                    loading:false
                }
            }
        case SET_PROFILE_LIST:
            return {
                ...state,
                profileList: {
                    list: payload,
                    loading: false
                },
            }
        case LOAD_PROFILE_TABLE_VIEW:
            return {
                ...state,
                profileList: {
                    ...state.profileList,
                    loadingTableView: true
                },
                activeFilter:[]
            }
        case SET_PROFILE_TABLE_VIEW:
            return {
                ...state,
                profileList: {
                    list: payload,
                    loadingTableView: false
                },
            }
        case SET_HAS_MORE_DATA:
            return {
              ...state,
              profileList: {
                ...state.profileList,
                hasMore: payload
              }
            }
        case ADD_DATA_PROFILE_LIST:
            return {
                ...state,
                profileList: {
                    list: state.profileList.list.concat(payload),
                    loadingMore: false
                },
            }
        case LOAD_MORE_PROFILE_LIST:
            return {
              ...state,
              profileList: {
                ...state.profileList,
                loadingMore: true
              },
            }
        case LOAD_PROFILE_LIST:
            return {
                ...state,
                profileList: {
                    ...state.profileList,
                    loading: true
                },
                activeFilter:[]
            }
        case TOGGLE_ADD_PHONE:
            return {
                ...state,
                showAddPhoneMod: payload,
            };
        case TOGGLE_ADD_EMAIL:
            return {
                ...state,
                showAddEmailMod: payload,
            };
        case TOGGLE_ADD_LEAD:
            return {
                ...state,
                showAddLeadMod: payload,
            };
        case PROFILE_FILTER_OPTIONS:
            return {
                ...state,
                filterOptions: {
                    ...payload, 
                    loading:false
                }
            };
        case SET_FILTER:
            return {
                ...state,
                activeFilter: payload.activeFilter,
                isFiltered: payload.isFiltered
            };
        case SET_SAVED_FILTERS:
            return {
                ...state,
                savedFilters: payload
            }
        
        case START_LOADING_PROFILE_CHAT:
            return {
              ...state,
              activeChat: {
                chat: undefined, 
                loading: true
            }
            }
        case UPDATE_ACTIVE_PROFILE_CHAT:
        case SET_ACTIVE_PROFILE_CHAT:
            return{
                ...state,
                activeChat: {
                    chat: payload, 
                    loading: false
                }
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE_ERROR:
            return {
                ...state,
                error: '',
            }
        case PROFILE_SUCCESS:
            return {
                ...state,
                success: payload,
                loading: false,
            }
        case CLEAR_PROFILE_SUCCESS:
            return {
                ...state,
                success: '',
            }
        case UPDATE_PROFILE:
          const profileList = state.profileList.list.slice()
          const updatedProfileList = profileList.map(profile => {
            if(profile._id === payload._id) {
              return payload
            }
            return profile
          })
          return {
            ...state,
            profileList: {
              ...state.profileList,
              list: updatedProfileList
            }
          }
        default:
            return state;
    }
}