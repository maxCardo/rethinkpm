import {SET_COMP_LIKE,SET_COMP_UNLIKE} from '../type'
import { createErrorAlert, createSuccessAlert } from "../alert";
import axios from 'axios'

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

    // try {
    //     const res = await axios.get(`/api/marketplace/owners/${id}/${type}`)
    //     dispatch({
    //         type: SET_OWNER_INFO,
    //         payload: res.data
    //     })

    // } catch (err) {
    //     dispatch(createErrorAlert(err.message, 'SET OWNER DATA'))
    // }
}

