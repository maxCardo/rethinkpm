const htmlToText = require('html-to-text');

const {sendEmail} = require('../email')
const {mlsSold,mlsNew,mlsPriceDec, priceInc, contingent, backOnMarket, expired } = require('./listing') 

const RentPros = require('../../db/models/prospects/RentLeads/RentPros')
const RentInq = require('../../db/models/prospects/RentLeads/RentInq')


const zumperParse = async (data) => {
    const {to, from, subject, text, html} = data
    console.log(subject.slice(0, 18));

    
    if (subject.slice(0,18) === 'Zumper tenant lead') {
        console.log('running zumper leadparse');
        let textBody = await htmlToText.fromString(html, {wordwrap: null}) 
        var replyTo = to
        var bodyArr = textBody.split(/\n/);
        var phoneNumber;
    
        if (textBody.search(/\+1/) > 0) {
            phoneNumber = textBody.slice((textBody.search(/\+1/) + 2), ((textBody.search(/\+1/) + 12)));
    
        };
    
        if (textBody.search(/\(\d{3}\)/) > 0) {
            var rawNumber = textBody.slice((textBody.search(/\(\d{3}\)/)), ((textBody.search(/\(\d{3}\)/) + 14)));
            phoneNumber = '+1' + rawNumber.replace(/[\s () -]/g, '') + ''
        };

        //save record to db
        try {
            // check if user exist and get user or create new if user does not exist
            let pros;
            phoneNumber ? pros = await RentPros.findOne({ 'phone.number': phoneNumber }) : pros = await RentPros.findOne({ email: email.address })

        // validate phone number
        //if (phoneNumber) pros.phone.phoneType = await validateNum(phoneNumber);


        if (!pros) {
            const nameArr = bodyArr[2].split(' ');
            pros = await new RentPros({
              firstName: nameArr[0],
              lastName: nameArr[1],
              fullName: bodyArr[2],
              email: {
                address: from.slice(from.indexOf('<') + 1, -1),
                isPrimary: true,
              },
              phoneNumbers: {
                number: phoneNumber.slice(2),
                isPrimary: true,
                okToText: true,
              },
            });
        };
        const listing = (bodyArr[0].slice(bodyArr[0].search("interested in ") + 14)).split(":")[0]
        
        //check if lead for this asset exist or create new
        let inq = await RentInq.findOne({ prospect: pros._id, campaign:listing });

        if (!inq) {
            inq = await new RentInq({
                prospect: pros._id,
                campaign: listing,
                leadSource: 'zumper'

            })
        };
        inq.notes.push({
            type: 'log',
            content:'new lead created from zumper'
        })

        await inq.save();
        await pros.save();
    } catch (e) {
        console.error(e);
        sendEmail('adampoznanski@outlook.com', `Error: ${subject}`, text, html);

    }
        //reply to email 
        //notify team via slack
    } else {sendEmail('adampoznanski@outlook.com', subject, text, html)}
}

const zillowBuyers = async (data) => {
    console.log('zillowBuyers');
}

const mlsListings = async (data) => {
    const { to, from, subject, text, html } = data
    console.log(subject);
    const route = await htmlToText.fromString(subject, { wordwrap: null })

    switch(route){
        case 'new':
            mlsNew(html);
            break;
        case 'sold':
            console.log('switch: sold');
            mlsSold(html);
            break;
        case 'priceDecrease':
            mlsPriceDec(html);
            break;
        case 'priceIncrease':
            priceInc(html);
            break;
        case 'underContract':
        case 'contingent':
            contingent(html);
            break;
        case 'BackOnMarket':
            backOnMarket(html);
            break;
        case 'expired':
            expired(html);
            break;
        
        default:
            console.log('subject switch fail');
            sendEmail('adampoznanski@outlook.com', `mls switch default: ${subject}`, text, html);
    }
}


module.exports = {zumperParse, zillowBuyers, mlsListings}



// sample axios call with headers
// const globalHeader = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     accesskey: idxClientID,
//     ancillarykey: idxPartnerID,
//     outputtype: 'json'
// }

// // @desc: get all idx users
// const getUsers = async () => await axios({
//     url: 'https://api.idxbroker.com/leads/lead',
//     method: 'get',
//     headers: globalHeader
// })