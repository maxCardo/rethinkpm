import axios from "axios";
import { SET_LEASELEAD_LIST, SET_LEASELEAD_SMS, SEND_SMS, UPDATE_SMS} from "../type";
import {createErrorAlert} from "../alert";

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };

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
  //note: We relay on the leaselead id here as the primary index item to bring up a chat. this becomes a dependence down range into state, server and back to state. 
  //      Would it be more reliable to pass the chat ID from the front end in the future. It would require refactor of server and state calls if we decide to do so. 
  const client_id = crypto.randomUUID()
  console.log('cltID: ', client_id)
  dispatch({
    type: SEND_SMS,
    payload: {id, msg, client_id}
  })
  const res = await axios.post(`/api/comms/sms/leaselead/send_sms`, {leaseLead_id: id, msg, client_id}, config)
  console.log('res: ', res)    
  //update state with message with processing
  dispatch({
    type: UPDATE_SMS,
    payload: {id, data: res.data}
  })
}

