import {SET_LOADING, SET_LEASELEAD_LIST, SET_LEASELEAD_SMS,SEND_SMS, UPDATE_SMS, REC_LSE_SMS} from '../actions/type';

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
                    ...state.sms,
                    list: state.sms.list.map(item => 
                        item.leaseLead._id !== payload.id 
                        ? item
                        :{...item,msg: [...item.msg,{...payload.msg, client_id : payload.client_id}]}
                    )
                },
            }
        case UPDATE_SMS:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: state.sms.list.map(chat => chat.leaseLead._id !== payload.id 
                        ? chat 
                        : {
                            ...chat,
                            msg: chat.msg.map(m => 
                                m[payload.data.idType] !== payload.data.id
                                ? m
                                : {...m, ...payload.data.updateObj, client_id: undefined}

                            )
                        }
                    )
                }
            }
        case REC_LSE_SMS:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: state.sms.list.map(chat => chat._id !== payload.id 
                    ? chat 
                    : {...chat, msg: [...chat.msg, payload.msg]}  
                    )
                }
            }
        default:
            return state;
    }
}