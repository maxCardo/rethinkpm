import {SET_LOADING, SET_LEASELEAD_LIST, SET_LEASELEAD_SMS,SEND_SMS, UPDATE_SMS, REC_LSE_SMS, SEND_NEW_LSE_SMS, UPDATE_NEW_LSE_CHAT} from '../actions/type';

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
                    list: payload,
                    loading: false
                },
            }
        case SEND_SMS:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: state.sms.list.map(item => 
                        item._id !== payload.id 
                        ? item
                        :{...item,msg: [...item.msg,{...payload.msg, client_id : payload.client_id}]}
                    )
                },
            }
        case SEND_NEW_LSE_SMS:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: [...state.sms.list, payload.data]
                },
            }
        case UPDATE_SMS:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: state.sms.list.map(chat => chat._id !== payload.id 
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
        case UPDATE_NEW_LSE_CHAT:
            return {
                ...state,
                sms: {
                    ...state.sms,
                    list: state.sms.list.map(chat => {
                        if(chat.client_id !== payload.id){
                            console.log('not this one')
                            console.log(chat)
                            return chat
                        }
                        console.log('this one')
                        const chatRec =  {
                            ...chat, 
                            _id: payload.data.updateObj._id,
                            client_id: undefined,  
                            msg: chat.msg.map(m =>
                              m[payload.data.idType] !== payload.data.id
                                ? m
                                : {...m, ...payload.data.updateObj.msg, client_id: undefined}
                            )
                        }
                        console.log(chatRec)
                        return chatRec
                    }) 
                }
            }

        default:
            return state;
    }
}