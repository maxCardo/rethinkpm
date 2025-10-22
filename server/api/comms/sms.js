const express = require('express');
const { postSlack } = require('../../services/slack')
const {outgoingSMS} = require('../../services/sms')
const {testNewLeadSMS, incLseSMS} = require('../../scripts/Comms/leaseComms')

const router = express.Router();


// @route: post /api/comms/sms/parse_sms;
// @desc: parse sms sent via twilio API   
// @ access: Public
router.post('/leasing/parse_sms', (req, res) => {
  //make generic /parse_sms and use switch for spacific chancels like leasing dept
  try {
    incLseSMS(req.body)
    res.status(200).send('success');
  } catch (err) {
    res.status(400).send(err);
    console.error(err);
  }
})

// @route: post /api/comms/sms/parse_sms;
// @desc: Send sms via twilop API. Use for Testing   
// @ access: Public
router.post('/send_sms', async (req, res) => {
  try {
    console.log('hitting post sms api')
    const {from, to, body} = req.body
    const sendMsg = await outgoingSMS(from, to, body)
    res.status(200).send(sendMsg);
  } catch (err) {
    res.status(400).send(err);
    console.error(err);
  }
})




//----------------- testsing in dev calls -------------------------------------------//

// @route: get /api/comms/sms/test1_sms;
// @desc: call to trigger new lead and send SMS   
// @ access: Public
router.get('/test1_sms', async (req, res) => {
  try {
    console.log('hitting test sms api')
    testNewLeadSMS()
    res.status(200).send('sucess');
  } catch (err) {
    res.status(400).send(err);
    console.error(err);
  }
})




module.exports = router;