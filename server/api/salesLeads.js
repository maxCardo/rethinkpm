const express = require('express');
const {sendEmail} = require('../3ps/email')
const AgentModel = require('../db/models/sales/agent')
const OfficeModel = require('../db/models/sales/office')
const AudienceModel = require('../db/models/sales/audience')
const FilterModel = require('../db/models/sales/filters')

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

//---------------------------------------------------------- New task from user form ----------------------------------------------------------//
// @route: Post /api/sales/idx_lead;
// @desc: create new task from user form
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


// @route: Get /api/sales/agents
// @desc: Get all agents
// @ access: Private
router.get('/agents', async (req,res) => {
  const agents = await AgentModel.find({}).populate('office')
  res.json(agents)
})

router.get('/audiences', async (req,res) => {
  const audiences = await AudienceModel.find({})
  res.json(audiences)
})

router.post('/audiences', async (req,res) => {
  const {name, filters, leads} = req.body
  const audience = new AudienceModel({name, filters, leads});
  await audience.save()
  console.log('Audience saved')
  res.json({result: 'ok'})
})

router.get('/filters', async (req,res) => {
  const filters = await FilterModel.find({})
  res.json(filters)
})

router.post('/filters', async (req,res) => {
  const {name, filters} = req.body
  const filter = new FilterModel({name, filters});
  await filter.save()
  console.log('Filter saved')
  res.json({result: 'ok'})
})



module.exports = router;