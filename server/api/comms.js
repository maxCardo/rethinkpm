const express = require('express');
const { sendEmail } = require('../3ps/email')
const Agent = require('../db/models/sales/agent')
const Chat = require('../db/models/comms/chat')
const RentPros = require('../db/models/prospects/RentLeads/RentLeadPros')


const router = express.Router();

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

]

// @route: Post /api/comms/chat;
// @desc: Receive chat msg via api (use for testing )
// @ access: Public *ToDo: update to make private
//Note: migrated call to server page in order to include socket call
router.post('/chat', async (req, res) => {
    try {
        let { To, From, Body } = req.body;
        From = From.slice(2)
        //get the chat
        let chat = await Chat.findOne({from:From, to:To})
        //if no active chat see if there is an active contact for that number and start a chat
        if (!chat) { 
            const activeNum = activeNumber.find((number) => number.number === To)
            const model = activeNum.model
            const record = await model.findOne({'phoneNumbers.number': From})
            //if no record save a record.... in future trigger bot to gather more info or save as unknown contact
             chat = await new Chat({
                owner: record ? record._id: null,
                ownerType:activeNum.profile,
                title: record? record.fullName: null,
                subTitle: activeNum.campaign,
                botOn:  true,
                unread: true,
                from: From,
                to: To,
                messages:[],
            })
        }
        chat.messages.push({message: Body})
        await chat.save()
        res.status(200).send(chat);

    } catch (error) {
        console.error(error);
        res.send('server Error')
    }
});

// @route: get /api/comms/chat/:owner;
// @desc: get single chat by owner 
// @ access: Public *ToDo: update to make private
router.get('/chat/:ownerId', async (req, res) => {
    try {
        console.log(req.params.ownerId);
        const chat = await Chat.findOne({owner: req.params.ownerId})
        console.log(chat);
        res.status(200).send(chat)
    } catch (err) {
        res.status(400).send('server error')
    }
})


  

module.exports = router;