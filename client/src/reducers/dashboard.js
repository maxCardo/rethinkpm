import { SET_INQUIRIES, UPDATE_INQUIRY } from '../actions/type';
const initialState = [];

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case SET_INQUIRIES:
          return{
            ...state,
            inquiries: payload.inquiries,
            inquiriesRaw: payload.inquiriesRaw
          }
        case UPDATE_INQUIRY:
          const allInquiries = state.inquiriesRaw.map((inquiry) => {
            if(inquiry._id === payload._id) {
              return payload
            }
            return inquiry
          })
          const newInquiries = {
            upcoming: [],
            engaged: [],
            cold: [],
            scheduled: [],
            toured: [],
            application: [],
            new: [],
            dead: []
          }
          allInquiries.forEach((lead) => {
            newInquiries[lead.status.currentStatus].push(lead)
          })
          return{
            ...state,
            inquiries: newInquiries,
            inquiriesRaw: allInquiries
          }
        default:
            return state;
    }
}