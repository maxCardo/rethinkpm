const express = require('express');
const { sendEmail } = require('../3ps/email')
const Agent = require('../db/models/sales/agent')
const ChatAgent = require('../db/models/sales/chat')


const router = express.Router();

//----------------------------------------------------------- Chats ---------------------------------------------------------//
// NOT ACTIVE ...
// @route: GET /api/agent_lead/chats;
// @desc: get all chats (read and unread): use when loading chat page.
// @ access: Public *ToDo: update to make private
router.get('/chats', async (req, res) => {
    console.log(' All chats api fired');
    try {
        console.log('get chat fired');
        const chats = await ChatAgent.find().populate({ path: 'owner', select: ['fullName', 'sales'], populate: { path: 'office', select: 'name' } });
        res.status(200).send(chats);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// NOT ACTIVE ...
// @route: GET /api/agent_lead/chats/unread;
// @desc: get all unread chats: use when loading mini chat component.
// @ access: Public *ToDo: update to make private
router.get('/chats/unread', async (req, res) => {
    console.log('unread chats api fired');
    // try {
    //     const chats = await ChatInq.find({ unread: true });
    //     res.status(200).send(chats);
    // } catch (error) {
    //     console.error(error);
    //     res.status(400).send('server error')
    // }
});

// NOT ACTIVE ...
//get single chat for dashboard record icon if no chat create chat
// @route: GET /api/agent_lead/chat/:chat_id;
// @desc: NOT ACTIVE: get single chat by inq id: use on leasing dashboard, triggerd by inq chat icon. 
// @ access: Public *ToDo: update to make private
router.get('/chat/:inq_id', async (req, res) => {
    console.log('get single inq chat');
    // try {
    //     let chat = await ChatInq.findOne({ inq: req.params.inq_id }).populate({ path: 'inq', select: 'prospect', select: 'listing', populate: { path: 'prospect', select: 'name' } })
    //     if (!chat) {
    //         chat = await new ChatInq({ inq: req.params.inq_id })
    //         chat.save(async (err, item) => {
    //             chat = await ChatInq.findOne(item).populate({ path: 'inq', select: 'prospect', select: 'listing', populate: { path: 'prospect', select: 'name' } })
    //             console.log(chat)
    //             res.status(200).send(chat);
    //         })
    //     } else {
    //         res.status(200).send(chat);
    //     }

    // } catch (error) {
    //     console.error(error);
    //     res.status(400).send('server error')
    // }
});

// @route: Post /api/agent_lead/chat;
// @desc: Receive chat msg via api (use for testing )
// @ access: Public *ToDo: update to make private
//Note: migrated call to server page in order to include socket call
router.post('/chat', async (req, res) => {
    try {
        let { To, From, Body } = req.body;
        From = From.slice(2)
        //find agent
        //ToDo: adjust schema to make phone numbers unique
        let agent = await Agent.findOne({ 'phoneNumbers.number': From})
        // ToDO: plan for incoming sms with no save agent belonging to number. transfer to global chat?
        //if (!agent) { pros = await new RentLeadPros({ phone: { phoneNumber: From } }) };
        !agent ? console.log('no agent') : null
        let chat = await ChatAgent.findOne({ owner: agent._id });
        if (!chat) { chat = await new ChatAgent({ owner: agent._id }) };

        //update message
        chat.messages.unshift({ message: Body, from: 'User-SMS' });
        await agent.save();
        await chat.save();
        
        res.send(agent);

    } catch (error) {
        console.error(error);
        res.send('server Error')
    }
});

module.exports = router;