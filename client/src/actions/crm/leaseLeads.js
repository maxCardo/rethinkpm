import axios from "axios";
import { SET_LEASELEAD_LIST, SET_LEASELEAD_SMS, SEND_SMS, UPDATE_SMS, SEND_NEW_LSE_SMS, UPDATE_NEW_LSE_CHAT} from "../type";
import {createErrorAlert} from "../alert";

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };

//****** See ./sms for incoiming sms calls via web socket *******//


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

export const sendLseSMS = (isChat ,id , msg, lead) => async (dispatch) => {
 
  const client_id = crypto.randomUUID()
  //is this an existing chat?
  if (isChat) {
    dispatch({
      type: SEND_SMS,
      payload: {id, msg, client_id}
    })
    const res = await axios.post(`/api/comms/sms/leaselead/send_sms`, {id, msg, client_id}, config)
    console.log('res: ', res)    
    //update state with message with processing
    dispatch({
      type: UPDATE_SMS,
      payload: {id, data: res.data}
    })
    return  
  }
  msg.client_id = client_id 
  const chatObj ={
    openDate:Date.now(),
    primeNum: lead.phoneNumbers.find(num => num.isPrimary === true).number,
    leaseLeadArr:[lead._id],
    unread: false,
    lastMsgDate: Date.now(),
    msg: [msg],
    client_id
  }
  dispatch({
    type: SEND_NEW_LSE_SMS,
    payload: {data: chatObj}
  })
  //ToDo: Edge case, if the user send a second message right away before the server has returned confirmaiton that leadSMS has been created will that error?
  //send call to api to create new lead
  try {
    const res = await axios.post(`/api/comms/sms/leaselead/send_new_sms`, {data: chatObj, client_id}, config)
    //dispatch update with return
    console.log('this is what the return is sending on a new lead sms call. ', res)
    dispatch({
      type: UPDATE_NEW_LSE_CHAT,
      payload: {id: client_id, data: res.data}
    })  
  } catch (err) {
    console.log('getting and error on this function and I dont know why. ')
    console.error(err);
    dispatch(createErrorAlert('Error Sending New SMS'))
  }  
}

