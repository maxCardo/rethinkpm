import uuid from 'uuid';
import { ALERT_FAILURE, REMOVE_ALERT } from './type';

export const setAlert = (msg, location) => dispatch => {
    const id = uuid.v4();
    dispatch({
      type: ALERT_FAILURE,
      payload: {
          heading: "Server Error",
          msg: msg,
          location: location
      }
    });
}