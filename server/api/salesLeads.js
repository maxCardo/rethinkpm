const express = require('express');
const {sendEmail} = require('../3ps/email')
const auth = require('../middleware/auth')
const idx = require('../3ps/idx')

const router = express.Router();

//---------------------------------------------------------- New task from user form ----------------------------------------------------------//
// @route: Post /api/sales/web_lead;
// @desc: create new task from user form
// @ access: Public  *ToDo make private once tenants begin to log on on the software.
router.post('/web_lead', (req,res) => {
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

// @route: Post /api/sales/idx_lead;
// @desc: create new task from idx user form
// @ access: Public  *ToDo make private once tenants begin to log on on the software.
router.post('/idx_lead', (req,res) => {
  const { name, lastName, email, phone, requestInfo, message, listingID } = req.body

  //set to adampoznanski@outlook.com for prod
  const emailTo = 'adampoznanski@outlook.com'

  const emailBody = `
    You received a new contact message with the following information:</br>
    Name: ${name} </br>
    Last Name: ${lastName} </br>
    Email: ${email} </br>
    Phone: ${phone} </br>
    Request Info: ${requestInfo} </br>
    Listing ID: ${listingID} </br>
    ${message && `Message: ${message} </br>`}
  `

  const emailSubject = `New contact message ${requestInfo && 'requesting info'} ${listingID && `about listing with id: ${listingID}`}`

  sendEmail(emailTo, emailSubject,'', emailBody)
  res.status(200).send('ok')
})

//---------------------------------------------------------- IDX API Calls ----------------------------------------------------------//

// @route: Get /api/sales/deal_uw/:listing_id;
// @desc: user req for listing data
// @ access: Private  
router.get('/deal_uw/:listing_id', async (req, res) => {
  try {
    //get user profile using req.user
    //check if listing is included in saved listings if not save listing
    //pull idx listing data 
    //pull county data
    //pull rent projection
    //aggragate all data from api's into object 
    //send to client
    res.status(200).send('ok')  
  } catch (err) {
    res.status(400).send('server error')
  }
})

module.exports = router;