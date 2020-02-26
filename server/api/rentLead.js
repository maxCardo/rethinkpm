const express = require('express');
const RentLeadPros = require('../db/models/prospects/RentLeads/RentLeadPros');
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const ChatInq = require('../db/models/prospects/RentLeads/chat');
const templet = require('../templets/newLead');
const {postSlack} = require('../3ps/slack');
const {validateNum, sendFirstSMS, testSMS} = require('../3ps/sms');
const {sendFirstEmail} = require('../3ps/email');
const {loadTestDB} = require('../dev/testDB')


const router = express.Router();

//ToDo: change to call to DB once property table is created
const {propertyNum} = require('../3ps/calandly');

//---------------------------------------------------------- New Lead From Email Parse ----------------------------------------------------------//
// @route: Post /api/rent_lead;
// @desc: create new prospect from email parse api call
// @ access: Public
router.post('/', async (req, res) => {
    try {
        const {name, phoneNumber, email, property} = req.body

        // check if user exist and get user or create new if user does not exist
        let pros;
        phoneNumber ? pros = await RentLeadPros.findOne({ 'phone.phoneNumber': phoneNumber }) : pros = await RentLeadPros.findOne({email:email})    
        
        if (!pros) {
            pros = await new RentLeadPros({
                name,
                email,
                phone:{
                    phoneNumber,
                }
            });
        };

        // validate phone number
        if (phoneNumber) pros.phone.phoneType = await validateNum(phoneNumber);

        //check if lead for this asset exist or create new
        let inq = await RentLeadInq.findOne({prospect:pros._id, listing:property});

        if (!inq) {
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
// @desc: get all open leads on client
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

// @route: PATCH /api/rent_lead/update_inquiry/:inq_id;
// @desc: update record when update form on UI is submitted
// @ access: Public * ToDo: update to make private
router.patch('/update_inquiry/:inq_id', async (req, res) => {
    try {
        const inq = await RentLeadInq.findById(req.params.inq_id).populate({path:'prospect'})
        const {status} = req.body;
        if(status) {
          inq.status.currentStatus = status;
        }
        switch(req.body.workflow){
            case 'setAppointment':
                const {appointmentDate} = req.body
                inq.status.scheduled.schDate = appointmentDate;
                break;
            case 'trackTour':
                const {tourResults,tourDate,interestLevel} = req.body
                inq.status.toured.tourDate = tourDate;
                inq.status.toured.tourRes = tourResults;
                inq.status.toured.intrLvl = interestLevel;
                break;
            case 'recordApplication':
                const {appDate, appStatus, holdFee} = req.body
                inq.status.application.appDate = appDate;
                inq.status.application.appStatus = appStatus;
                inq.status.application.holdFee = holdFee;
                break;
            default:
                res.status(400).send('error with form submission');
        }
        await inq.save()
        res.status(200).send(inq);
    } catch (error) {
        console.error(error);
        
        res.status(400).send('server error')
    }
});


//old api ep for UI updates  below


// @route: PATCH /api/rent_lead/sch_form;
// @desc: update record when tour is scheduled
// @ access: Public * ToDo: update to make private
router.patch('/sch_form', async (req, res) => {
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
// @route: GET /api/rent_lead/chats;
// @desc: get all chats (read and unread): use when loading chat page.
// @ access: Public *ToDo: update to make private
router.get('/chats', async (req, res) => {
    console.log(' All chats api fired');
    try {
        const chats = await ChatInq.find().populate({path:'inq',select:'prospect',select:'listing', populate: {path:'prospect', select: 'name'}});
        res.status(200).send(chats);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: GET /api/rent_lead/chats/unread;
// @desc: get all unread chats: use when loading mini chat component.
// @ access: Public *ToDo: update to make private
router.get('/chats/unread', async (req, res) => {
    console.log('unread chats api fired');
    try {
        const chats = await ChatInq.find({unread:true});
        res.status(200).send(chats);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

//get single chat for dashboard record icon if no chat create chat
// @route: GET /api/rent_lead/chat/:chat_id;
// @desc: get single chat by inq id: use on leasing dashboard, triggerd by inq chat icon. 
// @ access: Public *ToDo: update to make private
router.get('/chat/:inq_id', async (req, res) => {
    console.log('get single inq chat');
    try {
        let chat = await ChatInq.findOne({ inq: req.params.inq_id }).populate({path:'inq',select:'prospect',select:'listing', populate: {path:'prospect', select: 'name'}})
        if (!chat) { 
          chat = await new ChatInq({ inq: req.params.inq_id })
          chat.save(async (err, item) => {
            chat = await ChatInq.findOne(item).populate({path:'inq',select:'prospect',select:'listing', populate: {path:'prospect', select: 'name'}})
            console.log(chat)
            res.status(200).send(chat);
          })
        } else {
          res.status(200).send(chat);
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: Post /api/rent_lead/chat;
// @desc: Receive chat msg via api (use for testing )
// @ access: Public *ToDo: update to make private
//Note: migrated call to server page in order to include socket call
router.post('/chat', async (req, res) => {
    try {     
        const {To, From, Body} = req.body;
        const property = propertyNum[To];
    
        //find pros/inq
        let pros = await RentLeadPros.findOne({'phone.phoneNumber': From}) 
        if (!pros) {pros = await new RentLeadPros({phone:{phoneNumber: From}})};
        let inq = await RentLeadInq.findOne({ 'listing': property, 'prospect'  : pros._id});
        if (!inq) {inq = await new RentLeadInq({ prospect:pros._id, listing:property})};
        let chat = await ChatInq.findOne({inq:inq._id});
        if (!chat) {chat = await new ChatInq({inq:inq._id})};
        
        //update message
        chat.messages.unshift({message:Body});
        await pros.save();
        await inq.save();
        await chat.save();
    
        res.send(chat);
       
    } catch (error) {
        console.error(error);
        
        res.send('server Error')
    }
});

//----------------------------------------------------------- Testing ---------------------------------------------------------//

// @route: GET /api/rent_lead/loadtestdb
// @desc: get single chat by inq id: use on leasing dashboard, triggerd by inq chat icon. 
// @ access: Public *ToDo: update to make private
router.get('/loadtestdb', async (req, res) => {
    try {
        loadTestDB();
        res.status(200).send('oh ya!');
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: Post /api/rent_lead/testSMSEnv;
// @desc: Receive chat msg via api (use for testing )
// @ access: Public *ToDo: update to make private
//Note: migrated call to server page in order to include socket call
router.post('/testsmsenv', async (req, res) => {
    try {
        testSMS('+14124445181')
        res.send('ohhh ya');

    } catch (error) {
        console.error(error);

        res.send('server Error')
    }
});



module.exports = router;
