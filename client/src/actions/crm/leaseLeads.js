import axios from "axios";
import { SET_LEASELEAD_LIST, SET_LEASELEAD_SMS, SEND_SMS} from "../type";
import {createErrorAlert} from "../alert";

// const config = {
//   headers: { "Content-Type": "application/json", Accept: "application/json" },
// };

//@desc: get all flaged props deal for showcase comp
export const getLeaseLeadData = () => async (dispatch) => {
  console.log("running get leaselead data");
  try {
    const res = await axios.get("/api/crm/leaselead");
    if (res?.data) {
      console.log("res: ", res);
      dispatch({
        type: SET_LEASELEAD_LIST,
        payload: res.data,
      });
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getLeaseSMS =  () => async (dispatch) => {
  console.log('running get leases SMS from actions')
    try {
        const res = await axios.get(`/api/crm/leaselead/comms/sms`);
        dispatch({
            type: SET_LEASELEAD_SMS,
            payload: res.data
        })    
    } catch (err) {
      console.log('this is the error')
      console.error(err);
      dispatch(createErrorAlert('Error Loading Lease Lead SMS'))
        
        
    }   
}

// @desc: fetch all users for lead owner selection
export const getAllUsers = () => async () => {
  try {
    const res = await axios.get("/api/users/all");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
};

export const sendLseSMS = (id , msg) => async (dispatch) => {
    console.log('running send lse sms!! ... this is the data')
    console.log(id)
    console.log(msg)
    //update state with message with processing
    dispatch({
      type: SEND_SMS,
      payload: {id, msg}
    })    
    
    //send to server to update DB
    //update state recived
    //error handeling

}

