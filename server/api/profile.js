const express = require('express');
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const Agent = require('../db/models/sales/agent')

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
      const lead = await  Agent.findById(req.params.id).populate('prospect notes');
      const notesPopulated = await  Note.populate(lead.notes, {path: 'user'})
      lead.notes = notesPopulated
      res.status(200).send(lead);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

module.exports = router;