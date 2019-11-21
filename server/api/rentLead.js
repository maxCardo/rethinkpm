const express = require('express');
const RentLeadPros = require('../db/models/prospects/RentLeads/RentLeadPros');
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const ChatInq = require('../db/models/prospects/RentLeads/chat');
const templet = require('../templets/newLead');
const {postSlack} = require('../3ps/slack');
const {validateNum, sendFirstSMS} = require('../3ps/sms');
const {sendFirstEmail} = require('../3ps/email');
const router = express.Router();



//---------------------------------------------------------- New Lead From Email Parse ----------------------------------------------------------//
// @route: Post /api/rent_lead;
// @desc: create new prospect
// @ access: Public
router.post('/', async (req, res) => {
    try {
        const {name, phoneNumber, email, property} = req.body

        // check if user exist and get user or create new if user does not exist
        let pros;
        phoneNumber ? pros = await RentLeadPros.findOne({ 'phone.phoneNumber': phoneNumber }) : pros = await RentLeadPros.findOne({email:email})    
        
        if (!pros) {
            console.log('if pros fired')
            pros = await new RentLeadPros({
                name,
                email,
                phone:{
                    phoneNumber,
                }
            });
        };

        console.log(pros);

        // validate phone number
        if (phoneNumber) pros.phone.phoneType = await validateNum(phoneNumber);

        //check if lead for this asset exist or create new
        let inq = await RentLeadInq.findOne({prospect:pros._id, listing:property});

        if (!inq) {
            console.log('if inq fired')
            inq = await new RentLeadInq({
                prospect: pros._id,
                listing: property,

            })
        };

        //send first contact, email or phone
        pros.phone.phoneType === 'mobile' ? (sendFirstSMS(pros,inq)):(sendFirstEmail(pros.email,inq.listing));


        //update notes on inq
        pros.notes.unshift({note: `inquired about ${inq.listing} sent firstContact.`});


        await pros.save();
        await inq.save();

        res.send({inq});
    } catch (e) {
        console.error(e);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});


//--------------------------------------------------------- UI Routes For Viewing Records -------------------------------------------------------//

// @route: GET /api/rent_lead/open_leads;
// @desc: get all open leads
// @ access: Public *ToDo: update to make private
router.get('/open_leads', async (req, res) => {
    console.log('open leads api fired');
    try {
        const leads = await RentLeadInq.find({'status.currentStatus':{$ne: 'dead'}}).populate('prospect');
        res.status(200).send(leads);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

//----------------------------------------------------------- UI Routes Updating Records ---------------------------------------------------------//

// @route: PATCH /api/rent_lead/sch_form;
// @desc: update record when tour is scheduled
// @ access: Public * ToDo: update to make private
router.patch('/sch_form', async (req, res) => {
   console.log('sch_form api fired');
   try {
       const record = await RentLead.findOneAndUpdate({'phoneNumber': req.body.phoneNumber }, { $set: {schDate: req.body.schDate}},{new:true});
       res.status(200).send(record);
   } catch (error) {
       res.status(400).send('server error')
   }
});

// @route: PATCH /api/rent_lead/tour_form;
// @desc: update record when tour is completed
// @ access: Public * ToDo: update to make privat
router.patch('/tour_form', async (req, res) => {
    console.log('tour_form api fired');
    try {
        const record = await RentLead.findOneAndUpdate({ 'phoneNumber': req.body.phoneNumber }, {
            $set: {
                tourRes: req.body.tourRes,
                intrLvl: req.body.intrLvl
            }
        },{new:true});
        res.status(200).send(record);
    } catch (error) {
        console.log(error);
        res.status(400).send('server error')
    }
});

// @route: PATCH /api/rent_lead/app_form;
// @desc: update form when application is recived
// @ access: Public * ToDo: update to make private
router.patch('/app_form', async (req, res) => {
    console.log('app_form api fired');
    try {
        const record = await RentLead.findOneAndUpdate({ 'phoneNumber': req.body.phoneNumber }, {
            $set: {
                application:{
                    appStatus: req.body.appStatus,
                    holdFee: req.body.holdFee
                }
            }
        },{new:true});
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send('server error')
    }
});


// @route: PATCH /api/rent_lead/arc_form;
// @desc: archive record when not interested
// @ access: Public * ToDo: update to make private
router.patch('/arc_form', async (req, res) => {
    console.log('app_form api fired');
    try {
        const record = await RentLead.findOneAndUpdate({ 'phoneNumber': req.body.phoneNumber }, {
            $set: {
                status: {
                    currentStatus: req.body.status,
                    deadWhy: req.body.reasonForArc
                }
            },
        },{new:true});
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send('server error')
    }
});

//----------------------------------------------------------- Chats ---------------------------------------------------------//

// @route: GET /api/rent_lead/open_leads/chats;
// @desc: get all open leads includings chats
// @ access: Public *ToDo: update to make private
router.get('/open_leads/chats', async (req, res) => {
    console.log('open leads chat api fired');
    try {
        const leads = await RentLeadInq.find({ 'status.currentStatus': { $ne: 'dead' } }).populate('prospect').populate('chat');
        res.status(200).send(leads);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: Post /api/rent_lead/chat;
// @desc: Receive message via SMS
// @ access: Public *ToDo: update to make private
router.post('/chat', async (req, res) => {
    try {     
        const {From, Body} = req.body;
    
        //find prospect
        let pros = await RentLeadPros.findOne({ 'phone.phoneNumber': From });
        if (!pros) {
            console.log('did not find prospect')
            pros = await new RentLeadPros({phone: {phoneNumber:From}});
        };
        
        console.log(pros)
        //find chat
        let chat = await ChatInq.findOne({prospect:pros._id});
        if (!chat) {
            console.log('did not find chat') 
            chat = await new ChatInq({prospect:pros._id})
        };
        console.log(chat)
        //update message
        chat.messages.unshift({message:Body});
        await chat.save();
        await pros.save();
    
        res.send(chat);
       
    } catch (error) {
        console.error(error);
        
        res.send('server Error')
    }
});

//BELOW NOT TESTED!!!

// @route: GET /api/rent_lead/open_leads/chat/:chat_id;
// @desc: get single chat for prospect
// @ access: Public *ToDo: update to make private
router.get('/open_leads/chat/:chat_id', async (req, res) => {
    console.log('open leads chat api fired');
    try {
        const chat = await ChatInq.find({prospect: req.params.chat_id });
        if (!chat) { chat = await new ChatInq({ prospect: req.params.chat_id})};
        res.status(200).send(chat);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});


//read message on UI - Socket
//post message on/from UI -Socket



module.exports = router;
