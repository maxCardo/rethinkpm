
const config = require('./../config/creds');
const client = require('twilio')(config.twlsid, config.twlAuthToken);

const {availabilityLink} = require('./calandly');


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


const sendFirstSMS = (number,listing) => {
    console.log('fired first sms');
    const temp1 = `Thanks for your interest in ${listing}. Do you have any quastions about the place?` 
    const temp2 = `You can also use the link below to check our availbility and schedual a showing.\n\n ${availabilityLink[listing]}`
    
    setTimeout(() => {
        sendSMS(number, temp1);
    }, 30000);

    setTimeout(() => {
        sendSMS(number, temp2);
    }, 40000);
}



module.exports = { sendSMS, sendFirstSMS, validateNum };
