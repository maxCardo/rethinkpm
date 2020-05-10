const express = require('express');
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const Agent = require('../db/models/sales/agent')
const singleFamilySalesModel = require('../db/models/sales/singleFamilySales')
const multiSalesModel = require('../db/models/sales/multiSales')
const {validateNum} = require('../3ps/sms')

const router = express.Router();

// @route: GET /api/profile/inquiry/:id;
// @desc: Get Inquiry Id info
// @ access: Public * ToDo: update to make private
router.get('/inquiry/:id', async (req, res) => {
  try {
      const lead = await  RentLeadInq.findById(req.params.id).populate('prospect notes');
      const notesPopulated = await  Note.populate(lead.notes, {path: 'user'})
      lead.notes = notesPopulated
      res.status(200).send(lead);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

// @route: GET /api/profile/agent/:id;
// @desc: Get Inquiry Id info
// @ access: Public * ToDo: update to make private
router.get('/agent/:id', async (req, res) => {
  try {
      const leadResult = await  Agent.findById(req.params.id).populate('prospect notes office');
      const notesPopulated = await  Note.populate(leadResult.notes, {path: 'user'})
      leadResult.notes = notesPopulated
      const lead = Object.assign({}, leadResult._doc)
      const agentSellsPromise = singleFamilySalesModel.find({agentId: lead.agentId})
      const agentBuysPromise = singleFamilySalesModel.find({sellingAgentId: lead.agentId})
      const agentMultiSalesPromise = multiSalesModel.find({agentId: lead.agentId})
      const [agentSellsResult, agentBuysResult, agentMultiSalesResult] = await Promise.all([agentSellsPromise, agentBuysPromise, agentMultiSalesPromise])
      const allSales = agentSellsResult.concat(agentBuysResult,agentMultiSalesResult)
      const {bestZipCodes, bestAreas} = calculateBestZipCodesAndAreas(allSales)
      lead.agentSells = agentSellsResult
      lead.agentBuys = agentBuysResult
      lead.agentMultiSales = agentMultiSalesResult
      lead.bestZipCodes = bestZipCodes
      lead.bestAreas = bestAreas
      lead.bestZipCodesString = bestZipCodes.map(({name}) => name).join(', ')
      lead.bestAreasString = bestAreas.map(({name}) => name).join(', ')
      res.status(200).send(lead);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

// @route: PUT /api/profile/agent/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/agent/:id", async (req, res) => {
  try {

    if (req.body.phoneNumbers) {
      console.log('validate number functined not running in dev');
      //req.body.phoneNumbers.map(async (record) => record.phoneType = await validateNum(record.number))
    }
    const agent = await Agent.findById(req.params.id)
    await agent.set({
      ...agent,
      ...req.body
    })
    var thereq = req.body;
    //var result = await agent.save();
    res.status(200).json({thereq});
  } catch (err) {
    res.status(500).send(err);
  }
});

function calculateBestZipCodesAndAreas(sales) {
  const zipCodes = {

  }
  const areas = {

  }
  sales.forEach((sale) => {
    const {zipcode, area} = sale
    const saleValue = sale.soldPrice;
    if(zipCodes[zipcode]) {
      zipCodes[zipcode] += saleValue
    } else {
      zipCodes[zipcode] = saleValue
    }
    if(areas[area]) {
      areas[area] += saleValue
    } else {
      areas[area] = saleValue
    }
  })
  const sortedZipcodes = transformObjectIntoSortedArray(zipCodes)
  const sortedAreas = transformObjectIntoSortedArray(areas)
  return {
    bestZipCodes: sortedZipcodes.slice(0,3),
    bestAreas: sortedAreas.slice(0,3)
  }
}

function transformObjectIntoSortedArray(object) {
  const array = []
  for(prop in object) {
    array.push({
      name: prop,
      value: object[prop]
    })
  }
  const arraySorted = array.sort((a, b) => (a.value < b.value) ? 1 : -1)
  return arraySorted
}


//---------------------------------- new api call from refactor 5-5-20 -----------------------------------------------------//

// @route: GET /api/profile/agentPros;
// @desc: Get one profile when loading profile screen (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/agentPros', async (req, res) => {
  try {
      const record = await  Agent.findOne().populate('prospect notes office');
      console.log(record);
      res.status(200).send(record);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

module.exports = router;