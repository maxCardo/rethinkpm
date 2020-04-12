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

//---------------------------------------------------------- Pulic and In-house data ----------------------------------------------------------//
// @desc: get user cencus tract id
const getCencusTract = async (address) => {
  let data;
  try {
    const res = await axios({
      url: `https://geocoding.geo.census.gov/geocoder/geographies/address?street=${address.num}+${address.street}&state=${address.state}&zip=${+address.zip}&benchmark=9&vintage=910&format=json`,
      method: 'get'
    })

    data = JSON.parse(res).result.addressMatches[0].geographies["Census Tracts"][0].TRACT / 100
  } catch (e) {
    data = 'N/A'
  }

  return data
}

// @desc: get in-house rental rate projection data
const getRateData = async () => await axios({
  url: `https://script.google.com/macros/s/AKfycbw8-Jt8gDOM8uDrloO782VssOETn32kgaSfE5NVTNYfmzST_58/exec`,
  method: 'get'
})

// @desc: get county data from property address
const getCountyData = async (address) => {
  let data
  try {    
    const params = '{"PROPERTYADDRESS":"' + address.street + '","PROPERTYHOUSENUM":"' + address.num +'"}'
    const encoded = encodeURIComponent(params)
    data = await axios({
      url: `https://data.wprdc.org/api/3/action/datastore_search?resource_id=518b583f-7cc8-4f60-94d0-174cc98310dc&q=${encoded}`,
      method: 'get'
    })
  } catch (err) {
    data = { 'SALEPRICE': 'error', 'SALEDATE': 'error' }
  }
  return data
}

module.exports = { getUsers, getSavedListings, addListing, getCencusTract, getRateData, getCountyData }
