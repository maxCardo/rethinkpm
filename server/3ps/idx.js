const axios = require('axios')
const qs = require('qs')
const {idxClientID, idxPartnerID, idxSearchID} = require('./../config/creds');

//---------------------------------------------------------- IDX API Calls ----------------------------------------------------------//

const globalHeader = {
  'Content-Type': 'application/x-www-form-urlencoded',
  accesskey: idxClientID,
  ancillarykey: idxPartnerID,
  outputtype: 'json'
}

// @desc: get all idx users
const getUsers = async () => await axios({
  url: 'https://api.idxbroker.com/leads/lead',
  method: 'get',
  headers: globalHeader 
})

// @desc: get user by idx id and reture saved listings
const getSavedListings = async (userID) => await axios({
  url: `https://api.idxbroker.com/leads/property/${userID}`,
  method: 'get',
  headers: globalHeader 
})

// @desc add listing to users saved list
const addListing = async (userID, listingID) => {

  const body = {
    'property[idxID]': idxSearchID,
    'property[listingID]': listingID
  }


  const call = await axios({
    url: `https://api.idxbroker.com/leads/property/${userID}`,
    method: 'put',
    data: qs.stringify(body),
    headers: globalHeader 
  })

  return call
    
}


module.exports = { getUsers, getSavedListings, addListing };
