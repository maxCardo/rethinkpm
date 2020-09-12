import axios from 'axios';
import {
    SET_ACTIVE_PROFILE,
    TOGGLE_ADD_PHONE,
    TOGGLE_ADD_EMAIL,
    SET_PROFILE_LIST,
    LOAD_PROFILE_LIST,
    PROFILE_FILTER_OPTIONS,
    SET_FILTER,
    SET_SAVED_FILTERS,
    PROFILE_PAST_SALES,
    START_LOADING_PROFILE_CHAT,
    START_LOADING_PROFILE,
    SET_ACTIVE_PROFILE_CHAT,
    ADD_DATA_PROFILE_LIST,
    LOAD_MORE_PROFILE_LIST,
    SET_HAS_MORE_DATA,
    LOAD_PROFILE_TABLE_VIEW,
    LOAD_PROFILE_LIST_AND_TABLE,
    STOP_LOAD_PROFILE_LIST_AND_TABLE,
    SET_PROFILE_TABLE_VIEW,
    RESET_PROFILE_INFO,
    UPDATE_ACTIVE_PROFILE_CHAT,
    ALERT_SUCCESS,
    REMOVE_ALERT,
    ALERT_FAILURE,
    TOGGLE_ADD_LEAD,
    UPDATE_PROFILE, SET_MANAGED_BUYER

} from './type';
import {createErrorAlert} from './alert'
import { Next } from 'react-bootstrap/PageItem';


const config = {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};

//Set Active profile for selected lead record. 
export const setActiveProfile = profile => async dispatch => {
    try {
        dispatch({
          type: RESET_PROFILE_INFO
        })
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: profile
        })
        if (profile.hasOwnProperty("idxId")) {
            dispatch({
                type: SET_MANAGED_BUYER,
                payload: {
                    ...profile,
                    profileType: 'buyerPros'
                }
            })
        }
    } catch (err) {
      dispatch(createErrorAlert(err.message, 'setActiveProfile action'))
    }
};

//reload profile based on qs id
export const loadBackUpProfile = (profileType, profile) => {

    console.log('running load backup: ', profileType, profile);
//   try {
//     console.log('running set active profile');
//     dispatch({
//       type: SET_ACTIVE_PROFILE,
//       payload: profile,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
};

//grab first profile record
export const loadProfileDefault = profileType => async dispatch => {
    try {
      dispatch({
        type: START_LOADING_PROFILE
      })
        const res = await axios.get(`/api/profile/${profileType}`);
        const data = {...res.data, profileType}
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: data,
        });
    } catch (err) {
        console.log(err);
        dispatch(createErrorAlert(err.message, 'loadProfileDefault'))
    }
};

//grab profile list for default load and filter
export const loadProfileList = (profileType, queryList, pageNumber) =>async dispatch => {
  try {
    dispatch({
      type: LOAD_PROFILE_LIST,
    });
    
    const filter = {
      status: {
        accessor: 'status',
        dataType: 'array',
        name: 'status',
        type: {
          value: 'in',
          operator: '$in'
        },
        value: eval(queryList).map((status) => ({value: status}))
      }
    }

    const data = {
      filters: filter,
      page: pageNumber,
      pageSize: 500
    }

        
    const res = await axios.post(`/api/profile/${profileType}/filter`, data, config);
    
    dispatch({
        type: SET_PROFILE_LIST,
        payload: res.data.record,
    });
    dispatch({
      type: SET_HAS_MORE_DATA,
      payload: res.data.hasMore
    })
    dispatch({
        type: SET_FILTER,
        payload: {activeFilter: res.data.filters},
    });
  } catch (err) {
    console.log(err);
    dispatch(createErrorAlert(err.message, 'loadProfileList action'))
  }
};

export const loadProfileTableView = (profileType, filters, cancelToken) => async dispatch => {
  try {
    dispatch({
      type: LOAD_PROFILE_TABLE_VIEW,
    });
    
    const data = {
      filters
    }
    const res = await axios.post(`/api/profile/${profileType}/filter`, data, {cancelToken: cancelToken});
    dispatch({
      type: SET_PROFILE_TABLE_VIEW,
      payload: res.data.record,
    });
    dispatch({
      type: SET_FILTER,
      payload: {activeFilter: res.data.filters},
    });
    dispatch({
      type: SET_HAS_MORE_DATA,
      payload: res.data.hasMore
    })
  } catch (err) {
    if(axios.isCancel(err)) {
      return console.log('Cancelled by the user')
    }
    console.log(err);
    dispatch(createErrorAlert(err.message, 'loadProfileTableView action'))
  }
}

export const loadMoreDataProfileList = (profileType, queryList, pageNumber) => async dispatch => {
  try {
    dispatch({
      type: LOAD_MORE_PROFILE_LIST,
    });
    const filter = {
      status: {
        accessor: 'status',
        dataType: 'array',
        name: 'status',
        type: {
          value: 'in',
          operator: '$in'
        },
        value: eval(queryList).map((status) => ({value: status}))
      }
    }
    const data = {
      filters: filter,
      page: pageNumber,
      pageSize: 500
    }
    const res = await axios.post(`/api/profile/${profileType}/filter`, data, config);
    dispatch({
        type: ADD_DATA_PROFILE_LIST,
        payload: res.data.record,
    });
    dispatch({
      type: SET_HAS_MORE_DATA,
      payload: res.data.hasMore
    })
  } catch (err) {
    console.log(err);
    dispatch(createErrorAlert(err.message, 'loadMoreDataProfileList action'))
  }
}

//grab activeProfiles past sales (agentPros)
export const loadProfileSales = (profileType, id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${profileType}/pastSales/${id}`);
        dispatch({
            type: PROFILE_PAST_SALES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
        dispatch(createErrorAlert(err.message, 'loadProfileSales action'))
    }
};

//Toggle view control for show add phone modal
export const tglAddPhoneMod = meh => async dispatch => {
    try {
        dispatch({
            type: TOGGLE_ADD_PHONE,
            payload: meh
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'tglAddPhoneMod action'))
    }
}

//Toggle view control for show add phone modal
//set params active profile _id and new phone nun object
export const addPhoneNumSubmit = (formData, id, profileType) => async dispatch => {

    axios.put(`/api/profile/${profileType}/addPhone/${id}`, formData, config)
        .then((res) => {
            const data = { ...res.data, profileType }
            dispatch({
                type: SET_ACTIVE_PROFILE,
                payload: data,
            });
            dispatch({
              type: UPDATE_PROFILE,
              payload: data
            })
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Phone number added',
                    msg: 'Successfully added phone record'
                }
            });
        })
        .catch(err => {
          dispatch(createErrorAlert(err.message, 'addPhoneNumSubmit action'))
        });

}

// update primary phone record
export const updatePhone = (formData, id, profileType) => (dispatch) => {
    axios.put(`/api/profile/${profileType}/editPhone/${id}`, formData, config)
        .then((res) => {
            const data = { ...res.data, profileType }
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Primary Phone Update',
                    msg: 'Successfully updated primary phone record'
                }
            });
            dispatch({
              type: UPDATE_PROFILE,
              payload: data
            })
        })
        .catch(err => {
          dispatch(createErrorAlert(err.message, 'updatePhone action'))
        });
};

// update agent status
export const updateStatus = (formData, id, profileType) => (dispatch) => {
    axios.put(`/api/profile/${profileType}/editStatus/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Status Update',
                    msg: 'Successfully updated profile status'
                }
            });
        })
        .catch(err => {
          dispatch(createErrorAlert(err.message, 'updateStatus action'))
        });
};

//Toggle view control for show add email modal
export const tglAddEmailMod = action => async dispatch => {
    try {
        dispatch({
            type: TOGGLE_ADD_EMAIL,
            payload: action
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'tglAddEmailMod action'))

    }
}

//Toggle view control for show add phone modal
//set params active profile _id and new phone nun object
export const addEmailSubmit = (formData, id, profileType) => async dispatch => {

    axios.put(`/api/profile/${profileType}/addEmail/${id}`, formData, config)
        .then((res) => {
            const data = { ...res.data, profileType }
            dispatch({
                type: SET_ACTIVE_PROFILE,
                payload: data,
            });
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Email Added',
                    msg: 'Successfully added email address!'
                }
            });
        })
        .catch(err => {
          dispatch(createErrorAlert(err.message, 'addEmailSubmit action'))
        });

}

// update email
export const updateEmail = (formData, id, profileType) => (dispatch) => {
    axios.put(`/api/profile/${profileType}/editEmail/${id}`, formData, config)
        .then((res) => {

            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Email Update',
                    msg: 'Successfully updated email record'
                }
            });
        })
        .catch(err => {
          dispatch(createErrorAlert(err.message, 'updateEmail action'))
        });
};

//submit Filter query
export const submitFilterModal = (filters, profileType) => async dispatch => {
    try {
        dispatch({
            type: LOAD_PROFILE_LIST_AND_TABLE,
        });
        const data = {
          filters,
        }
        const res = await axios.post(`/api/profile/${profileType}/filter`, data, config);
        console.log(res);
        dispatch({
            type: SET_PROFILE_LIST,
            payload: res.data.record,
        });
        dispatch({
            type: SET_FILTER,
            payload: {activeFilter: res.data.filters, isFiltered:true},
        });
        dispatch({
          type: STOP_LOAD_PROFILE_LIST_AND_TABLE,
      });
    } catch (err) {
        console.log(err);
        dispatch(createErrorAlert(err.message, 'submitFilterModal action'))
    }
}

export const setFilter = (filter, isFiltered = true) => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: {activeFilter: filter, isFiltered: isFiltered},
});
}

//get filter options for array fields
export const getFilterOptions = (profileType) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${profileType}/filterOptions`);
        dispatch({
            type: PROFILE_FILTER_OPTIONS,
            payload: res.data
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'getFilterOptions action'))
    }
}

//save filter
export const saveFilter = (data, type, profileType) => async dispatch => {
    try {
        if(type === 'audience') {
          const res = await axios.post(`/api/profile/${profileType}/audiences`, data, config);
        } else {
          const res = await axios.post(`/api/profile/${profileType}/filters`, data, config);
        }
    } catch (err) {
      dispatch(createErrorAlert(err.message, 'saveFilter action'))

    }
}

//Load profile list based on selected saved filter
export const loadSavedFilter = (id, profileType, filterType) => async dispatch => {
    try {
        dispatch({
            type: LOAD_PROFILE_LIST,
        });
        if(filterType === 'audience') {
          const res = await axios.get(`/api/profile/${profileType}/audiences/${id}`)
          dispatch({
            type: SET_PROFILE_LIST,
            payload: res.data.record,
          });
          dispatch({
            type: SET_FILTER,
            payload: {activeFilter: res.data.filters},
          });
        } else {
          const res = await axios.get(`/api/profile/${profileType}/filters/${id}`)
          dispatch({
            type: SET_PROFILE_LIST,
            payload: res.data.record,
          });
          dispatch({
            type: SET_FILTER,
            payload: {activeFilter: res.data.filters, isFiltered:true},
          });
        }

    } catch (err) {
        console.log(err);
        dispatch(createErrorAlert(err.message, 'loadSavedFilter action'))
    }
}

//add note *agentPros, buyerPros
export const addNote = (data,id,profileType) => async dispatch =>{
    try {
        const res = await axios.post(`/api/profile/${profileType}/addNote/${id}`, data, config)
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: res.data
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'addNote action'))
    }
};

//get active profile chat
export const getActiveChat = (chatOwner) => async dispatch =>{
    try {
        dispatch({
          type: START_LOADING_PROFILE_CHAT
        })
        const res = await axios.get(`/api/comms/profile/chat/${chatOwner}`)
        dispatch ({
            type: SET_ACTIVE_PROFILE_CHAT,
            payload: res.data
        })
        
    } catch (err) {
      dispatch(createErrorAlert(err.message, 'getActiveChat action'))
    }
}

//send chat from UI
export const sendChat = (chatOwner, data) => async dispatch => {
    try {
        const res = await axios.post(`/api/comms/profile/chat/${chatOwner}`, data, config)

        dispatch({
            type: UPDATE_ACTIVE_PROFILE_CHAT,
            payload: res.data
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'sendChat action'))
    }
}

export const receiveSMS = (chat) => async dispatch =>{
    try {
        dispatch({
            type: UPDATE_ACTIVE_PROFILE_CHAT,
            payload: chat
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'receiveSMS action'))
    }
}

export const clearAlerts = () => (dispatch) => {
    dispatch({type: REMOVE_ALERT});
};

/*AddPersonModal*/
//Toggle view control for show add person modal
export const tglAddLeadMod = meh => async dispatch => {
    try {
        dispatch({
            type: TOGGLE_ADD_LEAD,
            payload: meh
        })

    } catch (err) {
      dispatch(createErrorAlert(err.message, 'tglAddLeadMod action'))

    }
}

//Toggle view control for show add phone modal
//set params active profile _id and new phone nun object
export const addLeadSubmit = (formData, profileType) => async dispatch => {

    axios.post(`/api/profile/${profileType}/addLead`, formData, config)
        .then((res) => {
            const data = { ...res.data, profileType }

            dispatch({
                type: SET_ACTIVE_PROFILE,
                payload: data,
            });

            dispatch({
                type: ADD_DATA_PROFILE_LIST,
                payload: res.data,
            });
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Lead added',
                    msg: 'Successfully added lead record'
                }
            });
        })
        .catch(err => {
          dispatch(createErrorAlert(err.message, 'addLeadSubmit action'))
        });

}

