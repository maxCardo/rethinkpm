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
      lead.agentSells = agentSellsResult
      lead.agentBuys = agentBuysResult
      lead.agentMultiSales = agentMultiSalesResult
      res.status(200).send(lead);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

module.exports = router;