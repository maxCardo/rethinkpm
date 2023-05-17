const axios = require('axios')
const qs = require('qs')
const { idxClientID, idxPartnerID, idxSearchID } = require('./../config/creds');

//---------------------------------------------------------- IDX API Calls ----------------------------------------------------------//

const globalHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    accesskey: idxClientID,
    ancillarykey: idxPartnerID,
    outputtype: 'json',
    apiversion: '1.2.2'
}

// @desc: create new idx users
// *note: email must be real email or call will return 500
const addIdxUser = async (record) => {
    const {firstName, lastName, email} = record
    const body = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'status': 'verified'
    }

    const res = await axios({
        url: `https://api.idxbroker.com/leads/lead`,
        method: 'put',
        data: qs.stringify(body),
        headers: globalHeader
    })

    return res.data
}

// @desc: get user by idx id and return saved listings
const getIdxSavedListings = async (userID) => await axios({
    url: `https://api.idxbroker.com/leads/property/${userID}/`,
    method: 'get',
    headers: globalHeader
})

// @desc: get all idx users
const getIdxUsers = async (userID) => await axios({
    url: `https://api.idxbroker.com/leads/property/${userID}/`,
    method: 'get',
    headers: globalHeader
})

// @desc add (like) listing to users saved list
const addIdxListing = async (userID, listingID) => {
    
    const body = {
        'property[idxID]': idxSearchID,
        'property[listingID]': listingID
    }
    
    const res = await axios({
        url: `https://api.idxbroker.com/leads/property/${userID}`,
        method: 'put',
        data: qs.stringify(body),
        headers: globalHeader
    })
    
    
    return res.data.newID
}

// @desc remove listing (unlike) from users saved list
const removeIdxListing = async (leadId, propId) => {
    axios({
        url: `https://api.idxbroker.com/leads/property/${leadId}/${propId}`,
        method: 'delete',
        headers: globalHeader,
    });
};

// @desc: get saved search data for new listings
const getIdxSavedLinkRes = async (searchID) => await axios({
    url: `https://api.idxbroker.com/clients/savedlinks/${searchID}/results`,
    method: 'get',
    headers: globalHeader
})

const getIdxCountyData = async (searchID) => await axios({
    url: `https://api.idxbroker.com/mls/counties/d504`,
    method: 'get',
    headers: globalHeader
})

module.exports = {addIdxUser, addIdxListing, getIdxSavedListings, removeIdxListing, getIdxCountyData}
