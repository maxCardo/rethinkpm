import { SET_AGENT_OPPORTUNITIES, UPDATE_AGENT_OPPORTUNITY } from '../actions/type';
const initialState = [];

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case SET_AGENT_OPPORTUNITIES:
            return{
                ...state,
                agentOpportunities: payload.agentOpportunities,
                agentOpportunitiesRaw: payload.agentOpportunitiesRaw
            }
        case UPDATE_AGENT_OPPORTUNITY:
            const allAgentOpportunities = state.agentOpportunitiesRaw.map((agentOpporunity) => {
                if(agentOpporunity._id == payload._id) {
                    return payload
                }
                return agentOpporunity
            })
            const newAgentOpportunities = {
                upcoming: [],
                engaged: [],
                cold: [],
                scheduled: [],
                toured: [],
                application: [],
                new: [],
                dead: []
            }
            allAgentOpportunities.forEach((lead) => {
                newAgentOpportunities[lead.status.currentStatus].push(lead)
            })
            return{
                ...state,
                agentOpportunities: newAgentOpportunities,
                agentOpportunitiesRaw: allAgentOpportunities
            }
        default:
            return state;
    }
}