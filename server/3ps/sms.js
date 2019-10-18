
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


const sendFirstSMS = (pros,listing) => {
    const {phone:{phoneNumber}, _id} = pros;
    const temp1 = `Thanks for your interest in ${listing}. Do you have any quastions about the place?` 
    const temp2 = `You can also use the link below to check our availbility and schedual a showing.\n\n ${availabilityLink[listing]}?salesforce_uuid=${_id}`
    
    setTimeout(() => {
        sendSMS(phoneNumber, temp1);
    }, 30000);

    setTimeout(() => {
        sendSMS(phoneNumber, temp2);
    }, 40000);
}



module.exports = { sendSMS, sendFirstSMS, validateNum };
