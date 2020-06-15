const htmlToText = require('html-to-text');
const cheerio = require('cheerio')
const {sendEmail} = require('../email')
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
    console.log('running mlsListing')
    const $ = cheerio.load('<body><div><p id="test">helloo nurse</p></div></body>')

    const test = $('#test').text()

    console.log('testing: ', test);


}


module.exports = {zumperParse, zillowBuyers, mlsListings}