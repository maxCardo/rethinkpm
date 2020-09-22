const express = require('express');
const {sendEmail} = require('../3ps/email')
const AgentModel = require('../db/models/prospects/agentPros/agent')
const OfficeModel = require('../db/models/sales/office')
const SalesListings = require('../db/models/sales/SalesListings')
const BuyerPros = require('../db/models/prospects/BuyerPros');
const {sendRecomendationEmail} = require('../3ps/email')

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



router.get('/offices', async(req,res) => {
  const offices = await OfficeModel.find({})
  res.json(offices)
})

router.get('/listings', async (req,res) => {
  const listings = await SalesListings.find({mlsStatus: 'A'}).limit(100)
  const listingsUpdated = await listings.map((listing) => {
    if (!listing.city) {
      listing.city = listing.area;
    }
    return listing;
  });
  res.json(listingsUpdated)
})

router.get('/kpi/numberOfListings', async (req, res) => {
  const actualNumber = 9000 + Math.floor(Math.random()*2000)
  const pastNumber = 9000 + Math.floor(Math.random()*2000)
  const porcentualChange = (((actualNumber - pastNumber) / pastNumber) * 100).toFixed(2)
  res.json({actualNumber, porcentualChange})
})


function convertFiltersToQuery(filters) {
  //create string query 
  const queryObj = {}
  filters.map((x) => {
      if (x.filterType === 'range') {
          Object.assign(queryObj, {
              [x.field]: { [x.operator[0]]: x.value, [x.operator[1]]: x.secondValue }
          })
      } else if (x.subField) {
          Object.assign(queryObj, { [`${x.field}.${x.subField}`]: { [x.operator]: x.value } })
      } else {
          Object.assign(queryObj, { [x.field]: { [x.operator]: x.value } })
      }
  })
  return queryObj
}



module.exports = router;