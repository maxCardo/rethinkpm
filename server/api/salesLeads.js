const express = require('express');
const {sendEmail} = require('../3ps/email')

const router = express.Router();

//---------------------------------------------------------- New task from user form ----------------------------------------------------------//
// @route: Post /api/sales/web_lead;
// @desc: create new task from user form
// @ access: Public  *ToDo make private once tenants begin to log on on the software.
router.post('/web_lead', (req,res) => {
    console.log(req.body);
    const { name, email, phone, subject, message } = req.body

    //set to adampoznanski@outlook.com for prod
    const emailTo = 'adampoznanski@outlook.com'

    const emailBody = `
      You received a new contact message with the following information:</br>
      Name: ${name} </br>
      Email: ${email} </br>
      Phone: ${phone} </br>
      Subject: ${subject} </br>
      Message: ${message} </br>
    `

    const emailSubject = `New contact message about ${subject}`
    
    sendEmail(emailTo, emailSubject,'', emailBody)
    res.status(200).send('ok')
})


module.exports = router;