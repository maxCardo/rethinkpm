const express = require('express');
const multer = require('multer')
const { sendEmail } = require('../3ps/email')
const Agent = require('../db/models/sales/agent')
const Chat = require('../db/models/comms/Chat')
const RentPros = require('../db/models/prospects/RentLeads/RentLeadPros')
const {outgoingSMS} = require('../3ps/sms')


const router = express.Router();
const upload = multer()

//store on DB in future may need to create type object for model names id sored as String in DB
const activeNumber = [
    { 
        number: "+14124447505",
        profile: 'agentPros',
        campaign: '',
        model: Agent 
    },
    {
        number: "+14124447710",
        profile: 'rentPros',
        campaign: '1500 Fallowfield',
        model: RentPros
    },
    {
        number: "+14124447505",
        profile: 'buyerPros',
        campaign: '',
        model: ''
    },


]

// @route: Post /api/comms/chat;
// @desc: Receive chat msg via api (use for testing )
// @ access: Public *ToDo: update to make private
//Note: migrated call to server page in order to include socket call
router.post('/chat', async (req, res) => {
    console.log('running post/chat');
    try {
        let { To, From, Body } = req.body;

        //get the chat
        let chat = await Chat.findOne({from:From, to:To})
        //if no active chat see if there is an active contact for that number and start a chat
        if (!chat) { 
            const activeNum = activeNumber.find((number) => number.number === To)
            const model = activeNum.model
            const fromNumber = From.slice(2)
            const record = await model.findOne({'phoneNumbers.number': fromNumber })
            //if no record save a record.... in future trigger bot to gather more info or save as unknown contact
             chat = await new Chat({
                owner: record ? record._id: null,
                ownerType:activeNum.profile,
                title: record? record.fullName: null,
                subTitle: activeNum.campaign,
                botOn:  true,
                unread: true,
                clientNum: From,
                routingNum: To,
                messages:[],
            })
        }
        chat.messages.push({
            sender: 'user',
            content: Body,
            userMessage: false
        })
        await chat.save()
        res.status(200).send(chat);

    } catch (error) {
        console.error(error);
        res.status(400).send('server Error')
    }
});

// @route: get /api/comms/chat/:owner;
// @desc: get single chat by owner 
// @ access: Public *ToDo: update to make private
router.get('/profile/chat/:ownerId', async (req, res) => {
    try {
        const chat = await Chat.findOne({owner: req.params.ownerId})
        res.status(200).send(chat)
    } catch (err) {
        res.status(400).send('server error')
    }
})

// @route: Post /api/comms/chat/:ownerId;
// @desc: Receive chat msg from profile comp in front end
// @ access: Public *ToDo: update to make private
//Note: migrated call to server page in order to include socket call
router.post('/profile/chat/:ownerId', async (req, res) => {
    const {activeProfile:{profileType, campaign = '', fullName, phoneNumbers}, message} = req.body
    let phone = (phoneNumbers.length && phoneNumbers.find((phone) => phone.isPrimary)) ? phoneNumbers.find((phone) => phone.isPrimary).number : '';
    try {
        let chat = await Chat.findOne({ owner: req.params.ownerId })
        if (!chat) {
            const activeNum = activeNumber.find((number) => number.profile === profileType && number.campaign === campaign )
            chat = await new Chat({
                owner: req.params.ownerId,
                ownerType: profileType,
                title: fullName,
                subTitle: campaign,
                botOn: false,
                unread: true,
                clientNum: phone,
                routingNum: activeNum.number && activeNum.number,
                messages: [],
            })

        }

        chat.messages.push(message)
        await chat.save()
        //ToDo: check if "To" phone is still active and if not send from default
        outgoingSMS(chat.routingNum, chat.clientNum, message.content)
        res.status(200).send(chat);

    } catch (error) {
        console.error(error);
        res.status(400).send('server Error')
    }
});


// @route: Post /api/comms/email/parse
// @desc: Receive chat msg from profile comp in front end
// @ access: Public *ToDo: update to make private
router.post('/email/parse',upload.none(), (req, res) => {
    try {
        const {to, from, html, subject, text} = req.body

        console.log(html)

        //sendEmail('adampoznanski@outlook.com', 'test email', 'testing sendgrid email')
        //sendEmail('ezrafreedlander@gmail.com', 'test email', 'testing sendgrid email')
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
    
})

module.exports = router;