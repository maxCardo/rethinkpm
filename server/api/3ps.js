const express = require('express');
const router = express.Router();

const pros = require('../db/models/prospects/RentLeads/RentLeadPros');
const inq = require('../db/models/prospects/RentLeads/RentLeadInq');
const {postSlack} = require('../3ps/slack');


//---------------------------------------------------------- Twilio ----------------------------------------------------------//
// @route: Post /api/3ps/sms;
// @desc: recive sms from twilio
// @ access: Public
router.post('/sms', async (req, res) => {
    let {From} = req.body;
    
    try {
        const lead = await pros.findOne({'phone.phoneNumber':From}).populate('inquiries.inquary');

        //TO DO: need to understand what listing they are contacting we can do this by having dedicated numbers for each listing
        const newLeads = await inq.find({prospect:lead._id, 'status.currentStatus':'new'});
        //update open inq status to engaged
        newLeads.map(lead => {
            console.log('yo')
            lead.status.currentStatus = 'engaged'
            lead.save()
        })
        //check if bot is on and if so respond
        //if bot is not on notify team via slack
        postSlack({text:'this is a test'});
        //push chat to front end (socket.IO?)
        res.send('test');
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});


//---------------------------------------------------------- Slack ----------------------------------------------------------//
// @route: Post /api/3ps/slack/post_slack;
// @desc: sends slack msg to app channel, used for error notifacation on AppScript script
// @ access: Public
router.post('/slack/post_slack', async (req, res) => {
    try {

        res.send('post slack api call');

    } catch (e) {
        console.error(e.message);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});


//---------------------------------------------------------- Calandly ----------------------------------------------------------//
// @route: Post /api/3ps/calandly/hook;
// @desc: picks up on 
// @ access: Public
router.post('/calandly/hook', async (req, res) => {
    try {

        res.send('calandly hook called');

    } catch (e) {
        console.error(e.message);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});




module.exports = router;