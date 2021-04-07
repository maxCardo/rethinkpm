const axios = require('axios')


// @desc: get county data from all properties associated with that address. use to find all properties owned by someone
const getOwnerProps = async (params) => {
    let data;
    try {
        data = await axios({
            url: `https://data.wprdc.org/api/3/action/datastore_search?resource_id=518b583f-7cc8-4f60-94d0-174cc98310dc&q=${params}`,
            method: 'get',
        });
    } catch (err) {
        console.error('error with the county api');
        data = { SALEPRICE: 'error', SALEDATE: 'error' };
    }
    return data.data.result.records;
};

module.exports = { getOwnerProps }