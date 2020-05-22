import axios from 'axios';
import {
    SET_ACTIVE_PROFILE,
    PROFILE_ERROR,
    TOGGLE_ADD_PHONE,
    TOGGLE_ADD_EMAIL,
    SET_PROFILE_LIST,
    CLEAR_PROFILE_ERROR,
    PROFILE_SUCCESS,
    CLEAR_PROFILE_SUCCESS,
    LOAD_PROFILE_LIST,
    PROFILE_FILTER_OPTIONS,
    SET_FILTER,
    SET_SAVED_FILTERS,
    PROFILE_PAST_SALES,
    SET_ACTIVE_PROFILE_CHAT

} from './type';
import { Next } from 'react-bootstrap/PageItem';


const config = {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};

//Set Active profile for selected lead record. 
export const setActiveProfile = profile => async dispatch => {
    try {
        console.log('running set active profile');
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: profile
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
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
    console.log('running load default: ', profileType);

    try {
        const res = await axios.get(`/api/profile/${profileType}`);

        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err,
                status: err,
            },
        });
    }
};

//grab profile list for default load and filter
export const loadProfileList = (profileType, queryList, pageNumber) =>async dispatch => {
   console.log('running profile sales action') 
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
    submitFilterModal(filter, profileType)(dispatch)
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err,
        status: err,
      },
    });
  }

};

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
            type: PROFILE_ERROR,
            payload: {
                msg: err,
                status: err,
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
            type: PROFILE_ERROR,
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
            //closing modal just for testing implemntation
            payload: false
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: 'could not open this modal'}
        });

    }
}

// update phone
export const updatePhone = (formData, id) => (dispatch) => {
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res.body);
            dispatch({
                type: PROFILE_SUCCESS,
                payload: {heading: 'Primary Phone Update', msg: 'Successfully updated primary phone record'}
            });
        })
        .catch(err => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {heading: 'Primary Phone Update', msg: 'Could not update record'}
            });
        });
};

// update status
export const updateStatus = (formData, id) => (dispatch) => {
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res.body);
            dispatch({
                type: PROFILE_SUCCESS,
                payload: {heading: 'Status Update', msg: 'Successfully updated profile status'}
            });
        })
        .catch(err => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {heading: 'Status Update', msg: 'Could not update profile status'}
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
            type: PROFILE_ERROR,
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
        console.log('running tglAddEmailMod');
        dispatch({
            type: TOGGLE_ADD_EMAIL,
            //closing modal just for testing implemntation
            payload: false
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: 'could not open this modal'}
        });

    }
}

// update email
export const updateEmail = (formData, id) => (dispatch) => {
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res.body);
            dispatch({
                type: PROFILE_SUCCESS,
                payload: {heading: 'Email Update', msg: 'Successfully updated email record'}
            });
        })
        .catch(err => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {heading: 'Email Update', msg: 'Could not update record'}
            });
        });
};

//submit Filter query
export const submitFilterModal = (data, profileType) => async dispatch => {
    try {
        dispatch({
            type: LOAD_PROFILE_LIST,
        });
        const res = await axios.post(`/api/profile/filter/${profileType}`, data, config);
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
            type: PROFILE_ERROR,
            payload: {
                msg: err,
                status: err,
            },
        });
    }
}

//get filter options for array fields
export const getFilterOptions = (profileType) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/filterOptions/${profileType}`);
        console.log('running set active profile');
        dispatch({
            type: PROFILE_FILTER_OPTIONS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//save filter
export const saveFilter = async (data) => {
    try {
        const res = await axios.post(`/api/profile/filter/save`, data, config);
        console.log(res)
    } catch (err) {
        console.log(err)
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
            type: PROFILE_ERROR,
            payload: {
                msg: err,
                status: err,
            },
        });
    }
}

//add note
export const addNote = (data,id,profileType) => async dispatch =>{
    try {
        const res = await axios.post(`api/profile/addNote/${profileType}/${id}`, data, config)
        dispatch({
            type: SET_ACTIVE_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
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
            type: PROFILE_ERROR,
            payload: { msg: err, status: err }
        })
    }
}

export const clearAlerts = () => (dispatch) => {
    dispatch({type: CLEAR_PROFILE_ERROR});
    dispatch({type: CLEAR_PROFILE_SUCCESS});
};
