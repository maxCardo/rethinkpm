const express = require('express');
const {sendEmail} = require('../3ps/email')

const router = express.Router();

//---------------------------------------------------------- New task from user form ----------------------------------------------------------//
// @route: Post /api/sales/web_lead;
// @desc: create new task from user form
// @ access: Public  *ToDo make private once tenants begin to log on on the software.
router.post('/web_lead', (req,res) => {
    console.log(req.body);

    //set to adampoznanski@outlook.com for prod
    const emailTo = 'testEmail@test.com'
    
    sendEmail(emailTo, 'subject here', 'test email Body')
    res.status(200).send('ok')
})


module.exports = router;