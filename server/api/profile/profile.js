const express = require('express');
const auth = require('../../middleware/auth')

//db models
const RentLeadInq = require('../../db/models/prospects/RentLeads/RentLeadInq');
const Agent = require('../../db/models/sales/agent')
const singleFamilySalesModel = require('../../db/models/sales/singleFamilySales')
const multiSalesModel = require('../../db/models/sales/multiSales')
const Office = require('../../db/models/sales/office')
const SavedFilter = require('../../db/models/prospects/SavedFilters')

const {validateNum} = require('../../3ps/sms')

//filter options: refactor to get these from api
const zipcodeOptions = require('../../config/supportData/zipcodes')
const areaOptions = require('../../config/supportData/areas')

const router = express.Router();

//api routes
router.use('/rentPros', require('./rentPros'))
router.use('/buyerPros', require('./buyerPros'))
router.use('/agentPros', require('./agentPros'))

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
router.put("/agentPros/:id", async (req, res) => {
  try {

    if (req.body.phoneNumbers) {
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


// @route: GET /api/profile/list/agentPros/:query;
// @desc: Get list of agentsPros to fill default profileList (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/list/agentPros/:query', async ({params:{query}}, res) => {
  try {
      // WARNING: DON'T USE EVAL IN THE SERVER, IF YOU WANT TO USE THIS ENDPOINT REWRITE THE FUNCTIONALITY
      // const list = await Agent.find({ status: { $in: eval(query) } })
      const SavedFilters = await SavedFilter.find({})
      res.status(200).send({list, SavedFilters});
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
    }
  });
  

// @route: POST /api/profile/filter/save;
// @desc: save filter selection as filter or audiance   
// @ access: Public * ToDo: update to make private
router.post('/filter/save', async (req, res) => {
  try {
    const savedFilter = await new SavedFilter(req.body)
    await savedFilter.save()
    res.status(200).send(savedFilter);
  } catch (err) {
    res.status(400).send('server error')
    console.error(err)
  }
});


//add post new note
// @route: POST /api/profile/addNotes/:profileType;
// @desc: save filter section as filter or audiance   
// @ access: Public
router.get('/saved_filter/agentPros/:id', async (req, res) => {
  try {
    filterId = req.params.id
    const savedFilter = await SavedFilter.findById(filterId)
    
    if (savedFilter.filterType == 'filter') {
      //create string query 
      const queryObj = {}
      savedFilter.filters.map((x) => {
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
      //query DB
      const record = await Agent.find(queryObj)
      res.status(200).send(record);
    } else if (savedFilter.filterType == 'audience'){
      const audience = savedFilter.audience
      const record = await Agent.find({_id:{$in: audience }})
      res.status(200).send(record);
    }else {
      res.status(401).send('could not find record')
    }

  } catch (err) {
    res.status(400).send('server error')
    console.error(err)
  }
});



module.exports = router;