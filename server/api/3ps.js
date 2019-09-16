const express = require('express');
const router = express.Router();


//---------------------------------------------------------- Twilio ----------------------------------------------------------//
// @route: Post /api/3ps/sms;
// @desc: 
// @ access: Public
router.post('/sms', async (req, res) => {
    try {
        
        res.send('twilio api call');

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