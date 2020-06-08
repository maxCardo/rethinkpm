import { SET_AGENT_OPPORTUNITIES, FILTER_AGENT_OPPORTUNITIES } from '../actions/type';
const initialState = [];

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case SET_AGENT_OPPORTUNITIES:
            return{
                ...state,
                agentOpportunities: payload.agentOpportunities,
                agentOpportunitiesRaw: payload.agentOpportunitiesRaw
            };
        case FILTER_AGENT_OPPORTUNITIES:
            return{
                ...state,
                agentOpportunities: payload.agentOpportunities,
                agentOpportunitiesRaw: payload.agentOpportunitiesRaw
            }
        default:
            return state;
    }
}