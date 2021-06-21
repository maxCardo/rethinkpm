import {UPDATE_PIPELINE_NOTES } from '../type'
import axios from 'axios'

import { createErrorAlert, createSuccessAlert } from "../alert";

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };

//@desc add note on listLead or sales lead ToDO: add notes on buyerPipeline (spacific to buyer inquary not salesListing)??? 
export const addNote = (data, id, type) => async dispatch => {
    try {
        const res = await axios.post(`/api/marketplace/pipeline/addNote/${id}/${type}`, data, config)
        dispatch({
            type: UPDATE_PIPELINE_NOTES,
            payload: res.data    
        })

    } catch (err) {
        dispatch(createErrorAlert(err.message, 'addNote action'))
    }
};

