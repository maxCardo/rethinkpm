import {SET_LOADING, SET_LEASELEAD_LIST, SET_LEASELEAD_SMS,SEND_SMS, CONFIRM_SEND_SMS} from '../actions/type';

const initialState = {
    loading: true,
    list: [],
    sms: {
        list: [],
        loading: true 
    },
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_LEASELEAD_LIST:
            return {
                ...state,
                list: payload,
                loading: false
            }
         case SET_LEASELEAD_SMS:
            return {
                ...state,
                sms: {
                    loading: false,
                    list: payload
                },
            }
        case SEND_SMS:
            return {
                ...state,
                sms: {
                    list: state.sms.list.map(item => {
                        if(item.leaseLead._id === payload.id) {
                            item.msg.push({
                                body: payload.msg.body,
                                to: payload.msg.to, 
                                from: payload.msg.from,
                            })
                            return item
                        }
                        return item
                    })
                },
            }
        case CONFIRM_SEND_SMS:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: state.sms.list.map(item => item._id === payload._id 
                        ? {...item } //insert update in object 
                        : item 
                    )
                }
            }
        default:
            return state;
    }
}