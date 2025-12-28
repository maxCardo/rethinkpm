const express = require('express');
const socket = require('../../socket')
const {outgoingSMS} = require('../../3ps/sms')
const {testNewLeadSMS, incLseSMS} = require('../../scripts/comms/leaseComms')
const mongoose = require('mongoose');

const LeaseSMS = require('../../db/models/comms/crm/LeaseSMS')

const router = express.Router();


// @route: post /api/comms/sms/leasing/parse_sms;
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

// @route: post /api/comms/sms/send_sms;
// @desc: Send sms via twilop API. Use for Testing   
// @ access: Public
router.post('/send_sms', async (req, res) => {
  try {
    console.log('hitting post sms api')
    console.log(req.body)
    const {from, to, body} = req.body
    const sendMsg = await outgoingSMS(from, to, body)
    res.status(200).send(sendMsg);
  } catch (err) {
    res.status(400).send(err);
    console.error(err);
  }
})

//----------------------- Lease Comms -----------------------------------------------//
// @route: post /api/comms/sms/leaselead/send_sms;
// @desc: Send sms via twilop API. Use for Testing   
// @ access: Public
router.post('/leaselead/send_sms', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const {msg, leaseLead_id, client_id} = req.body
  msg._id  = new mongoose.Types.ObjectId();
  try {
    await LeaseSMS.updateOne({leaseLead: leaseLead_id},{ $push: { msg: msg }, $set: {lastMsgDate: new Date()} },{session});
    await session.commitTransaction();
    session.endSession();
    let twilioMsg
    try {
      twilioMsg = await outgoingSMS(msg.from, msg.to, msg.body)  
    } catch (err) {
        await LeaseSMS.updateOne({ leaseLead: leaseLead_id, "msg._id": msg._id },{ $set: { "msg.$.status": 'failed' } });
        throw err
    }
    //save SID on DB record and update the status to queued
    await LeaseSMS.updateOne({leaseLead: leaseLead_id,"msg._id": msg._id },{ $set: { "msg.$.providerSid": twilioMsg.sid, "msg.$.status": 'queued' }});
    res.status(200).send({id:client_id, idType:'client_id', updateObj:{_id: msg._id, status:'queued'}});
  } catch (err) {
    await session.abortTransaction();
    res.status(400).send({id:client_id, idType:'client_id', updateObj:{_id: msg._id, status:'failed', providerSid:twilioMsg.sid }});
    console.error(err);
  }finally {
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();
  }
})



//----------------- testsing in dev calls -------------------------------------------//

// @route: get /api/comms/sms/leasing/rec_sms;
// @desc: call to trigger new lead and send SMS   
// @ access: Public
router.post('/leasing/rec_sms', async (req, res) => {
  try {
    console.log('hitting test leasing sms api')
    console.log(req.body)
    const {To:to, From:from,Body:body, MessageSid:providerSid, SmsStatus:status} = req.body
    //ToDO: Fix DB record to always save +1 format and create function to staderize all numbers incoming and calling the same. 
    const fromFmt = from.replace(/\D/, '').slice(-10)
    const convo = await LeaseSMS.findOne({primeNum: fromFmt})
    if (!convo) {
      console.log('need to build out functionality to handle messages from unkown numbers')
      //is it connected to a leaseLead?
      //if not response as maybe spam. 
      res.status(200).send('sucess');
    }else {
      console.log('this is the convo: ', convo)
      const msg  = {to, from, body, status, providerSid}
      convo.msg.push(msg)
      console.log(convo.msg)
      //await convo.save()
      socket.getIO().emit('leaseSMS:received', {id: convo._id, msg});
      res.status(200).send('sucess');
    }
  } catch (err) {
    res.status(400).send(err);
    console.error(err);
  }
})

module.exports = router;