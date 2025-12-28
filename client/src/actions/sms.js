import axios from "axios";
import { socket } from '../socket';
import {REC_LSE_SMS} from "./type";
import {createErrorAlert} from "./alert";

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };


/**
 * Register all SMS-related socket listeners
 * This should be called ONCE when the app loads
 */
export const registerSMSListeners = () => dispatch => {
  
  socket.off('leaseSMS:received');
  socket.on('leaseSMS:received', (payload) => {
    console.log('leasSMS:received is received!!!', payload)
    dispatch({
      type: REC_LSE_SMS,
      payload
    });
  });











  
};
