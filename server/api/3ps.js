const express = require('express');
const router = express.Router();

const pros = require('../db/models/prospects/RentLeads/RentLeadPros');
const inq = require('../db/models/prospects/RentLeads/RentLeadInq');
const {postSlack} = require('../3ps/slack');


//---------------------------------------------------------- Twilio ----------------------------------------------------------//
// @route: GET /api/3ps/sms;
// @desc: test for socket.io call
// @ access: Public
router.get('/test', (req, res) => {
  const io = req.io
  //io.emit('test', { msg: 'test message from api from second page' });
  res.send('test on second page good')
})


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
        //destructure req body
        const { event,payload: { event_type:{ name: property},event: { uuid:eventID ,start_time_pretty: startTime,cancel_reason:cancelReason },tracking:{salesforce_uuid:user},invitee:{name, email}}} = req.body;
        //     object:
        //     event: This is the event type
        //     user: User ID passed into calandly link when sending to pros
        //     name: User name entered into calandly, this should be more reliable then the user name from the ILS
        //     email:  User email, this is needed bec we only get the generic forward email from the ILS
        //     eventID: event ID to save for use if event is canceled or updated
        //     property: property name, this must match property name in DB so we can link properly ToDo: redesign data integrity
        //     startTime: time the appointment is set
        //     cancelReason: reason for cancel for our notes

        if (event === 'invitee.created') {
          //event created
          const record = await inq.findOneAndUpdate({_id:user},{$set: {
            'status.currentStatus': 'scheduled',
            'status.scheduled': startTime
          }},{new:true}).populate('prospect');

          const userID = record.prospect._id;
          const lead = await pros.findOneAndUpdate({_id:userID},{
            $set:{
              name:name,
              email:email,
            },
            $push:{
              notes:{note:`sch appointment via link at ${startTime}`}
            }
          },{new:true});

        }else if (event === 'invitee.canceled') {
          //event canceled
          // find event and update
          const record = await inq.findOneAndUpdate({_id:user},{$set: {
            'status.currentStatus': 'cold',
            'status.scheduled': ''
          }},{new:true}).populate('prospect');

          const userID = record.prospect._id;
          const lead = await pros.findOneAndUpdate({_id:userID},{
            $push:{
              notes:{note:`canceled appointment via link, reason: "${cancelReason}"`}
            }
          },{new:true});

          //notify shower and slack of event cancel
          // ToDo: when a event is updated it is canceled then resent, insure that this runs clean and does not error

        }

        res.send(lead);


    } catch (e) {
        console.error(e.message);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});




module.exports = router;
