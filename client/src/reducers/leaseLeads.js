import {SET_LOADING, SET_LEASELEAD_LIST, SET_LEASELEAD_SMS,SEND_SMS} from '../actions/type';

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
                    list: state.list.map(item => {
                        console.log('this is the item: ', item)
                        if(item.leaseLead._id === payload.id) {
                            item.message.push({
                                body: payload.text.text,
                                to: payload.text.to, 
                                from: payload.text.from,
                            })
                        }
                    })
                },
            }

        default:
            return state;
    }
}