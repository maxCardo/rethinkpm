const axios = require('axios')


// @desc: get county data from all properties associated with that address. use to find all properties owned by someone
const getOwnerProps = async (address, zip) => {
    let data;
    const url = `https://data.wprdc.org/api/3/action/datastore_search?resource_id=f2b8d575-e256-4718-94ad-1e12239ddb92&q={"CHANGENOTICEADDRESS1":"${address}","CHANGENOTICEADDRESS4":"${zip}"}`
    try {
        data = await axios({
            url: url,
            method: 'get',
        });
    } catch (err) {
        console.error('error with the county api');
        data = { SALEPRICE: 'error', SALEDATE: 'error' };
    }
    return data.data.result.records;
};

module.exports = { getOwnerProps }