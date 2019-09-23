
const config = require('./../config/creds');
const client = require('twilio')(config.twlsid, config.twlAuthToken);

const { availabilityLink } = require('./calandly');


const sendSMS = (to, body) => {
    client.messages
        .create({
            body: body,
            from: '+14124447505',
            to: to
        })
        .then(message => console.log(message.sid))
        .done();

    console.log('sending sms');
}

const validateNum = async (phoneNumber) => {
    let phoneType = 'n/a'
    await client.lookups.phoneNumbers(phoneNumber)
        .fetch({type:['carrier']})  
        .then((res) => {phoneType = res.carrier.type});
    return phoneType;
};


const sendFirstSMS = (data) => {
    const templet = `
    Thank you for your interest in ${data.property}. Would you like to schedual a time to see the place?
    \nPlease use the link below to check our availbility and schedual.\n${availabilityLink[data.property]}
  `

    sendSMS(data.phoneNumber, templet);
}



module.exports = { sendSMS, sendFirstSMS, validateNum };
