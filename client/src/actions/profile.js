import axios from 'axios';
import { SET_ACTIVE_PROFILE, PROFILE_ERROR, TOGGLE_ADD_PHONE, TOGGLE_ADD_EMAIL, EDIT_EMAIL } from './type';

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
            payload: { msg: err.response.statusText, status: err.response.status }
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


//grab first prospect record
export const loadProfileDefault = profileType => async dispatch => {
  console.log('running load default: ', profileType);

  try {
    const res = await axios.get(`/api/profile/${profileType}`);
    console.log('res');

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

//Toggle view control for show add phone modal
export const tglAddPhoneMod = action => async dispatch =>{
  try {
    console.log('running tglAddPhoneMod');
    dispatch({
      type: TOGGLE_ADD_PHONE,
      payload:action
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: 'could not open this modal' }
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
      payload: { msg: 'could not open this modal' }
    });

  }
}

//Toggle view control for show add email modal
export const tglAddEmailMod = action => async dispatch =>{
    try {
        console.log('running tglAddEmailMod');
        dispatch({
            type: TOGGLE_ADD_EMAIL,
            payload:action
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'could not open this modal' }
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
            payload: { msg: 'could not open this modal' }
        });

    }
}

// update email
export const updateEmail = (formData, id) => (dispatch) => {
    dispatch({ type: EDIT_EMAIL });
    axios.put(`/api/profile/agent/${id}`, formData, config)
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: 'Could not update record' }
            });
        });
};

