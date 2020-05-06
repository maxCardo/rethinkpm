import axios from 'axios';
import { SET_ACTIVE_PROFILE, PROFILE_ERROR } from './type';

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
      payload: res,
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