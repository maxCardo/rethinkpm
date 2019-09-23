const express = require('express');
const RentLead = require('../db/models/prospects/RentLead');
const {validateNum, sendFirstSMS} = require('../3ps/sms');
const {sendFirstEmail} = require('../3ps/email');
const router = express.Router();



//---------------------------------------------------------- New Lead From Email Parse ----------------------------------------------------------//
// @route: Post /api/rent_lead;
// @desc: create new prospect
// @ access: Public
router.post('/', async (req, res) => {
    try {
        // check if user exist, if user exist get object ID
        
        //else if user does not exist create user and reture object id
        
        //check if lead for this asset exist within last 90 days update record or create new
        
        
        //validate number and send first contact
        //const rentLead = await new RentLead(req.body);
        const rentLead = req.body; // delete after test
        rentLead.phoneType = await validateNum(req.body.phoneNumber);
        rentLead.phoneType === 'mobile' ? (console.log(sendFirstSMS(rentLead))):(sendFirstEmail(rentLead));
        //save inq
        //rentLead.save();

        //send state data to front end (why?? goes no where)
        res.send({rentLead});
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});


//--------------------------------------------------------- UI Routes For Viewing Records -------------------------------------------------------//

// @route: GET /api/rent_leads/open_leads;
// @desc: get all open leads
// @ access: Public *ToDo: update to make private
router.get('/open_leads', async (req, res) => {
    console.log('open leads api fired');
    try {
        const lead = await RentLead.find({'status.currentStatus':{$ne: 'dead'}}).sort({'status.lastActive':-1});
        res.status(200).send(lead);
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



module.exports = router;