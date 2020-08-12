const express = require('express');
const multer = require('multer')
const { sendEmail } = require('../3ps/email')
const Agent = require('../db/models/prospects/agentPros/agent')
const Chat = require('../db/models/comms/Chat')
const RentPros = require('../db/models/prospects/RentLeads/RentLeadPros')
const RentProsModel = require('../db/models/prospects/RentLeads/RentPros')
const RentInq = require('../db/models/prospects/RentLeads/RentInq')
const BuyerPros = require('../db/models/prospects/BuyerPros')
const {outgoingSMS} = require('../3ps/sms')
const {zumperParse, zillowBuyers, mlsListings} = require('../3ps/scrape_parse/emailParse')
const getOwner = require('./chatOwner/getOwner')
const auth = require('../middleware/auth')


const router = express.Router();
const upload = multer()

router.use(auth)

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

// @route: get /api/comms/chats
// @desc: get all the chats 
router.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.find({})
    res.status(200).send(chats)
  } catch (err) {
      res.status(400).send('server error')
  }
})

// @route: get /api/comms/profile
// @desc: get the profile info for the mini profile component of a specific chat 
router.post('/profile', async (req, res) => {
  try {
    const chatId = req.body.id
    const chat = await Chat.findById(chatId)
    const owner = getOwner(chat.owner, chat.ownerType)
    const profile = await owner.getProfile()
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(400).send('server error')
  }
})

// @route: get /api/comms/add_note
router.post('/add_note', async (req,res) => {
  const {chatId, type, content} = req.body
  console.log(req.body)
  const chat = await Chat.findById(chatId)
  const owner = getOwner(chat.owner, chat.ownerType)
  await owner.addNote({type, content}, req.user)
  const profile = await owner.getProfile()
  res.status(200).json(profile)
})

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
    let phone = (phoneNumbers.length && phoneNumbers.find((phone) => phone.isPrimary))
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
                clientNum: phone.number,
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
        const data = req.body
        const route = data.to.split('@')[0].replace('\"', '').toLowerCase()
        

        switch(route){
            case 'zumper':
                console.log('routing to zumper');
                zumperParse(data)
                break;
            case 'zillowrentals':
                console.log('zillow Rentals');
                break;
            case 'zillowbuyer':
                console.log('zillow Buyers');
                zillowBuyers(data)
                break;
            case 'newlisting':
                console.log('switch mls');
                mlsListings(data);
                break;
            default:
                console.log('defalt');
                console.log(route);
               
        }
        res.status(200).send('got it')
    } catch (err) {
        console.error('error rec');
        res.status(500).send()
    }
    
})

module.exports = router;