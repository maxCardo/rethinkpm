
const {twlAuthToken, twlsid, testNum} = require('./../config/creds');
const client = require('twilio')(twlsid, twlAuthToken);

const {availabilityLink} = require('./calandly');

const testSMS = (to) => {
    let sendTo;
    process.env.NODE_ENV === 'production' ? (sendTo = to) : (sendTo = testNum)
    console.log(sendTo);
    // client.messages
    //     .create({
    //         body: 'This is a test sms',
    //         from: '+14124447505',
    //         to: 
    //     })
    //     .then(message => console.log(message.sid))
    //     .done(); 
}


const sendSMS = (to, body) => {
    if (process.env.NODE_ENV === 'production') {
        client.messages
            .create({
                body: body,
                from: '+14124447505',
                to: to
            })
            .then(message => console.log(message.sid))
            .done();
            console.log('PRODS: sms sent');
    } else {

        console.log('sms sending function ran in dev. no sms sent')
        console.log('sms body: ', body)
    }
}

const validateNum = async (phoneNumber) => {
    let phoneType = 'n/a'
    await client.lookups.phoneNumbers(phoneNumber)
        .fetch({type:['carrier']})  
        .then((res) => {phoneType = res.carrier.type});
    return phoneType;
};


const sendFirstSMS = (pros,inq) => {
    const {phone:{phoneNumber}} = pros;
    const {listing, _id} = inq
    const temp1 = `Thanks for your interest in ${listing}. Do you have any quastions about the place?` 
    const temp2 = `You can also use the link below to check our availbility and schedual a showing.\n\n ${availabilityLink[listing]}?salesforce_uuid=${_id}`
    
    setTimeout(() => {
        sendSMS(phoneNumber, temp1);
    }, 30000);

    setTimeout(() => {
        sendSMS(phoneNumber, temp2);
    }, 40000);
}



module.exports = { sendSMS, sendFirstSMS, validateNum, testSMS };
