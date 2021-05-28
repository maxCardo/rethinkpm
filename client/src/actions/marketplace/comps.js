import {SET_COMP_LIKE, SET_COMP_UNLIKE, SET_FOCUSED_PROPERTY, SET_BUYER_PIPELINE, SET_SELLER_PIPELINE, UPDATE_BUYER_PIPELINE, UPDATE_SELLER_PIPELINE} from '../type'
import { createErrorAlert, createSuccessAlert } from "../alert";
import axios from 'axios'

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };

//@desc
export const likeComp = (prop, compId) => async dispatch => {
    console.log(prop);
    const newCompArr = prop.compReport.comps.map(x => x._id === compId ? {...x, like: true} : {...x} )
    console.log(newCompArr);
    prop.compReport.comps = newCompArr
    const newCompRep = prop
    dispatch({
        type: SET_COMP_LIKE,
        payload: newCompRep
    })
}

//@desc
export const unlikeComp = (prop, compId) => async dispatch => {
    dispatch({
        type: SET_COMP_UNLIKE,
        payload: compId
    })
}

//@desc
export const updateCompData = (object) => {
    console.log('update Comp Data Run: ', object);
}

//@desc
export const submitCompReport = () => async dispatch => {

}

//@desc
export const submitCompAnalysis = (report, type) => async dispatch => {

    console.log('report action submit:', report, type);

    //call api with updated report
    //grab returned listing record (with compReport Populated)
    //updated focusedProperty
    //update "pipeline"
    try {
        const data = {report, type}
        const res = await axios.put(`/api/marketplace/comps/submit_report`, data, config)
        console.log('res: ',res);
        dispatch({
            type: SET_FOCUSED_PROPERTY,
            payload: res.data
        })
        if (type === 'sellerLead') {
            console.log('sellerLead Fired');
            dispatch({
                type: UPDATE_BUYER_PIPELINE,
                payload: res.data
            })
            
        }else if (type === 'listLead'){
            console.log('listLead fired');
            dispatch({
                type: UPDATE_SELLER_PIPELINE,
                payload: res.data
            })
        }
    } catch (err) {
        dispatch(createErrorAlert(err.message, 'Submit Comp Report Error'))
    }
}

