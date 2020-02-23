import { SUBMIT_LOG } from '../actions/type';

const initialState = {
  logs: {
    '5df3fccc953d8c452c627175': [
      {
        record: 'This is a note',
        date: new Date(),
        user: 'Admin',
        type: 'note'
      },
      {
        record: 'This is another note',
        date: new Date(),
        user: 'Admin',
        type: 'note'
      },
      {
        record: 'This is a request of a service',
        date: new Date(),
        user: 'Admin',
        type: 'request'
      },
    ]
  }
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case SUBMIT_LOG:
        const logs = Object.assign({}, state.logs)
        if(!logs[payload.inquiryId]) {
          logs[payload.inquiryId] = []
        }
        logs[payload.inquiryId].push(payload.data)

        return {
          ...state,
          logs
        }
      default:
          return state;
    }
}