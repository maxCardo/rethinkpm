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
    SET_ACTIVE_PROFILE_CHAT,
    ADD_DATA_PROFILE_LIST,
    LOAD_MORE_PROFILE_LIST,
    SET_HAS_MORE_DATA,
    UPDATE_ACTIVE_PROFILE_CHAT, ALERT_SUCCESS, REMOVE_ALERT, ALERT_FAILURE

} from './type';
import { Next } from 'react-bootstrap/PageItem';


const config = {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};

//Set Active profile for selected lead record. 
export const setActiveProfile = profile => async dispatch => {
    try {
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: profile
        })
    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Server Error",
                msg: "Something went wrong!",
                location: "setActiveProfile malfunction"
            }
        });
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
        const res = await axios.get(`/api/profile/${profileType}`);

        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: res.data,
        });

    } catch (err) {
        console.log(err);
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: 'Server Error',
                msg: 'Something Went Wrong',
                location: 'loadProfileDefault malfunction'
            },
        });
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
      const res = await axios.post(`/api/profile/${profileType}/filter`, filter, config);
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
        payload: res.data.filters,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ALERT_FAILURE,
      payload: {
          heading: 'Server Error',
          msg: 'Could not get list at the moment',
          location: "loadProfileList malfunction!"
      },
    });
  }
};

export const loadMoreDataProfileList = (profileType, queryList, pageNumber) => async dispatch => {
  try {
    console.log(profileType)
    console.log(queryList)
    console.log(pageNumber)
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
    let res
    if(pageNumber) {
      res = await axios.post(`/api/profile/${profileType}/filter/${pageNumber}`, filter, config);
    } else {
      res = await axios.post(`/api/profile/${profileType}/filter`, filter, config);
    }
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
    dispatch({
      type: ALERT_FAILURE,
      payload: {
          heading: "Server Error",
          msg: "Could not load more data!",
          location: "loadMoreDataProfileList malfunction"
      },
    });
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
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                msg: "Something went wrong",
                heading: "Server Error",
                location: "loadProfileSales malfunction!"
            },
        });
    }
};

//Toggle view control for show add phone modal
export const tglAddPhoneMod = action => async dispatch => {
    try {
        console.log('running tglAddPhoneMod');
        dispatch({
            type: TOGGLE_ADD_PHONE,
            payload: action
        })

    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {msg: 'could not open this modal'}
        });

    }
}

//Toggle view control for show add phone modal
//set params active profile _id and new phone nun object
export const addPhoneNumSubmit = () => async dispatch => {
    console.log('running add phone submit');

    //set screen to loading
    //api call to add number
    //reset active profile in dom
    try {
        console.log('running tglAddPhoneMod');
        dispatch({
            type: TOGGLE_ADD_PHONE,
            payload: false
        })
        dispatch({
            type: ALERT_SUCCESS,
            payload: {
                heading: 'Phone Addition',
                msg: 'Successfully added a phone record',
            }
        });
    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: 'Phone addition',
                msg: 'Could not add record',
                location: 'addPhoneNumSubmit malfunction'
            }
        });

    }
}

// update primary phone record
export const updatePhone = (formData, id) => (dispatch) => {
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res.body);
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Primary Phone Update',
                    msg: 'Successfully updated primary phone record'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: ALERT_FAILURE,
                payload: {
                    heading: 'Primary Phone Update',
                    msg: 'Could not update record'
                }
            });
        });
};

// update agent status
export const updateStatus = (formData, id) => (dispatch) => {
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res.body);
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Status Update',
                    msg: 'Successfully updated profile status'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: ALERT_FAILURE,
                payload: {
                    heading: 'Status Update',
                    msg: 'Could not update profile status'
                }
            });
        });
};

//Toggle view control for show add email modal
export const tglAddEmailMod = action => async dispatch => {
    try {
        console.log('running tglAddEmailMod');
        dispatch({
            type: TOGGLE_ADD_EMAIL,
            payload: action
        })

    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {msg: 'could not open this modal'}
        });

    }
}

//Toggle view control for show add email modal
//set params active profile _id and new email nun object
export const addEmailSubmit = () => async dispatch => {
    console.log('running add email submit');

    //set screen to loading
    //api call to add email
    //reset active profile in dom
    try {
        dispatch({
            type: TOGGLE_ADD_EMAIL,
            payload: false
        })
        dispatch({
            type: ALERT_SUCCESS,
            payload: {
                heading: 'Email Added',
                msg: 'Successfully added email address!'
            }
        });
    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: 'Email addition',
                msg: 'Could not add email address!'
            }
        });

    }
}

// update email
export const updateEmail = (formData, id) => (dispatch) => {
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res.body);
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    heading: 'Email Update',
                    msg: 'Successfully updated email record'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: ALERT_FAILURE,
                payload: {
                    heading: 'Email Update',
                    msg: 'Could not update record'
                }
            });
        });
};

//submit Filter query
export const submitFilterModal = (data, profileType) => async dispatch => {
    try {
        dispatch({
            type: LOAD_PROFILE_LIST,
        });
        const res = await axios.post(`/api/profile/${profileType}/filter`, data, config);
        console.log(res);
        dispatch({
            type: SET_PROFILE_LIST,
            payload: res.data.record,
        });
        dispatch({
            type: SET_FILTER,
            payload: res.data.filters,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Server error",
                msg: "Something went wrong!",
                location: "submitFilterModal malfunction"
            },
        });
    }
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
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Server error",
                msg: "Something went wrong!",
                location: "getFilterOptions malfunction"
            }
        });

    }
}

//save filter
export const saveFilter = async (data) => async dispatch => {
    try {
        const res = await axios.post(`/api/profile/filter/save`, data, config);
        console.log(res)
    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: 'Action failed',
                msg: 'Saving filter/audience unsuccessful',
            }
        });

    }
}

//Load profile list based on selected saved filter
export const loadSavedFilter = (id, profileType) => async dispatch => {
    try {
        dispatch({
            type: LOAD_PROFILE_LIST,
        });
        const res = await axios.get(`/api/profile/saved_filter/${profileType}/${id}`)
        dispatch({
            type: SET_PROFILE_LIST,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Action failed",
                msg: "Could not load filter"
            },
        });
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
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Action failed",
                msg: "Could not add note!",
                location: "addNote malfunction"
            }
        });
    }
};

//get active profile chat
export const getActiveChat = (chatOwner) => async dispatch =>{
    try {
        const res = await axios.get(`/api/comms/chat/${chatOwner}`)
        dispatch ({
            type: SET_ACTIVE_PROFILE_CHAT,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Action failed",
                msg: "Could not get active chat",
                location: "getActiveChat malfunction",
                status: err
            }
        })
    }
}

//send chat from UI
export const sendChat = (chatOwner, data) => async dispatch => {
    try {
        console.log('running sendChat');
        const res = await axios.post(`/api/comms/chat/${chatOwner}`, data, config)
        dispatch({
            type: UPDATE_ACTIVE_PROFILE_CHAT,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Action failed",
                msg: "Could not send message",
                location: "sendChat malfunction",
            }
        })
    }
}

export const receiveSMS = (chat) => async dispatch =>{
    try {
        dispatch({
            type: UPDATE_ACTIVE_PROFILE_CHAT,
            payload: chat
        })

    } catch (err) {
        dispatch({
            type: ALERT_FAILURE,
            payload: {
                heading: "Action failed",
                msg: "Could not receive text message",
                location: "receiveSMS malfunction",
            }
        })
    }
}

export const clearAlerts = () => (dispatch) => {
    dispatch({type: REMOVE_ALERT});
};
