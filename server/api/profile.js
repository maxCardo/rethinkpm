const express = require('express');
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const Agent = require('../db/models/sales/agent')
const singleFamilySalesModel = require('../db/models/sales/singleFamilySales')
const multiSalesModel = require('../db/models/sales/multiSales')

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
      const leadResult = await  Agent.findById(req.params.id).populate('prospect notes');
      const notesPopulated = await  Note.populate(leadResult.notes, {path: 'user'})
      leadResult.notes = notesPopulated
      const lead = Object.assign({}, leadResult._doc)
      const agentSellsPromise = singleFamilySalesModel.find({agentId: lead.agentId})
      const agentBuysPromise = singleFamilySalesModel.find({sellingAgentId: lead.agentId})
      const agentMultiSalesPromise = multiSalesModel.find({agentId: lead.agentId})
      console.log(await Promise.all([agentSellsPromise, agentBuysPromise, agentMultiSalesPromise]))
      const [agentSellsResult, agentBuysResult, agentMultiSalesResult] = await Promise.all([agentSellsPromise, agentBuysPromise, agentMultiSalesPromise])
      const allSales = agentSellsResult.concat(agentBuysResult,agentMultiSalesResult)
      const {bestZipCodes, bestAreas} = calculateBestZipCodesAndAreas(allSales)
      lead.agentSells = agentSellsResult
      lead.agentBuys = agentBuysResult
      lead.agentMultiSales = agentMultiSalesResult
      lead.bestZipCodes = bestZipCodes
      lead.bestAreas = bestAreas
      res.status(200).send(lead);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
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

module.exports = router;