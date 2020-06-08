const htmlToText = require('html-to-text');





const zumperParse = async (data) => {
    const {to, from, subject, text, html} = data
    let textBody = await htmlToText.fromString(html, {wordwrap: null}) 

    //email textBody scrape
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

    console.log(bodyArr[0]);



    var record = {
        phoneNumber: phoneNumber,
        property: (bodyArr[0].slice(bodyArr[0].search("interested in ") + 14)).split(":")[0],
        email: from,
        name: bodyArr[2],
        date: new Date(),
        adPrice: '',
        msg: 'from zumper',
        MoveIn: '',
        CreditScore: '',
        Income: '',
        Pets: ''
    };

    //save record to db
    //reply to email 
    //notify team via slack

    console.log(record);
}


module.exports = {zumperParse}