const LeaseLead = require('../../db/models/Leasing/LeaseLead')
const LeaseSMS = require('../../db/models/comms/crm/LeaseSMS')
const {outgoingSMS} = require('../../3ps/sms')
const {postDiscord} = require('../../3ps/discord')



const testNewLeadSMS = async () => {

    const mainNum = "+14122147909"

    const testLead = await LeaseLead.find({fullName: 'Adam Poznanski'})
    console.log('this is our test lead: ', testLead)

    //get primary phone number
    const primeNum = testLead[0].phoneNumbers.filter(num => num.isPrimary === true)[0].number
    //create sms chanel with lead cross save records id's on both lead and smsChnl records
    const smsCnl = new LeaseSMS({primeNum, leaseLead: testLead[0]._id})
    console.log('sms channel: ', smsCnl)
    //send message back and forth
    const initalmsg = {
        to: primeNum,
        from: mainNum,
        msg: 'Thanks for contacting us. One of our agents will be in touch soon'
    }
    const message = await outgoingSMS( initalmsg.from, initalmsg.to, initalmsg.msg)
    console.log('message sent: ', message)
    //start testing scnarios
}

const incLseSMS = async ({From, To, Body}) => {
    try {
        //find lead in crm data
        let normalized = From.replace(/\D/g, ''); // remove non-digits
        if (normalized.startsWith('1') && normalized.length === 11) {
        normalized = normalized.substring(1); // remove leading "1" for +1 numbers
        }
        const lead = await LeaseLead.findOne({'phoneNumbers.number': normalized, status: {$nin: ['lost', 'tenant']}});
        //ToDo: Create route for previous tenant who are most likly to try to contact this number to main menue dispath system
            //adjust db call to allow for lost and tenant then route them to main menu or back to leasing workflow if lost
        if (lead) {
        //find open conversation in leaseSMS DB or if no open chancel create a new one
        let smsChnl = await LeaseSMS.findOne({leaseLead: lead._id})
        if(!smsChnl){
            console.log('no smsCnl, spinning one up')
            const primeNum = lead.phoneNumbers.filter(num => num.isPrimary === true)[0].number
            smsChnl = new LeaseSMS({primeNum, leaseLead: lead._id})
        }
        smsChnl.msg.push({body:Body,to: To,from: From})
        console.log('LeaseSMS: ', smsChnl)
        smsChnl.save()
        //msg group that there is a new "unread" messages for prospect.
        postDiscord(`New leasing message from ${lead.fullName}`, 'lease')
        }else{
            //ToDo: check if number belongs to a tenant number
            //send message back to number that we have no active lease record for this number. If you are looking to get intouch with our office or interested in leasing one of our spaces please contact the office at {{office number}}
            const msg = `
                Hi,\n
                My name is Max and I am the virtual assistant for F&G leasing team.\n
                I cant find a record for this number in our leasing system. If you are interested in one of our homes or you are a current tenant who is looking to get in touch with the managment team 
                please call our main line at (412)214-7919.\n
                Thanks\n
                Max
            `
            const sentSms = outgoingSMS(To, From , msg.replace(/\s+/g, ' ').trim())
            console.log('this is the outgoing sms: ', sentSms)
            //hit discord with message with that non lead number reaching out on leasing text line.  
            console.log('no lead found for that number')
            postDiscord(`rejected lease text from ${From}`, 'lease')
        }
    } catch (err) {
        console.error('Error finding lead:', err);
        throw err;
    }
      
}

const outLseSMS = async (lead, msg) => {
    //find lead smsCnl
    //if no cnl create new one
    //sent outgoing
    //save msg in smsCnl
    //if error save errror msg in smsCnl
    
}


module.exports = {testNewLeadSMS, incLseSMS}