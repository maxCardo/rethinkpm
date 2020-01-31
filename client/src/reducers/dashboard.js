import { SET_INQUIRIES, UPDATE_INQUIRY } from '../actions/type';
const initialState = [];

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case SET_INQUIRIES:
          return{
            ...state,
            inquiries: payload,
          }
        case UPDATE_INQUIRY:
          let allInquiries = []
          for(let type in state.inquiries) {
            allInquiries = allInquiries.concat(state.inquiries[type])
          }
          allInquiries = allInquiries.map((inquiry) => {
            if(inquiry._id == payload._id) {
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
          }
          allInquiries.forEach((lead) => {
            newInquiries[lead.status.currentStatus].push(lead)
          })
          return{
            ...state,
            inquiries: newInquiries,
          }
        default:
            return state;
    }
}