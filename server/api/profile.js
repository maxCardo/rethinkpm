const express = require('express');
const auth = require('../middleware/auth')

//db models
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const Agent = require('../db/models/sales/agent')
const singleFamilySalesModel = require('../db/models/sales/singleFamilySales')
const multiSalesModel = require('../db/models/sales/multiSales')
const Office = require('../db/models/sales/office')
const SavedFilter = require('../db/models/prospects/SavedFilters')

const {validateNum} = require('../3ps/sms')

//filter options: refactor to get these from api
const zipcodeOptions = require('../config/supportData/zipcodes')
const areaOptions = require('../config/supportData/areas')

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
// @desc: Get single profile when loading profile screen (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/agentPros', async (req, res) => {
  try {
      const record = await  Agent.findOne().populate('notes.user')
      res.status(200).send(record);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});


// @route: GET /api/profile/list/agentPros/:query;
// @desc: Get list of agentsPros to fill default profileList (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/list/agentPros/:query', async ({params:{query}}, res) => {
  try {
      const list = await Agent.find({ status: { $in: eval(query) } })
      const SavedFilters = await SavedFilter.find({})
      res.status(200).send({list, SavedFilters});
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
    }
  });
  
  // @route: GET /api/profile/filter/agentPros;
  // @desc: Get get new profile list based on filter submited
  // @ access: Public * ToDo: update to make private
  router.post('/filter/agentPros', async (req, res) => {
  try {
    const data = req.body
    const filterFields = Object.keys(req.body);
    const filters = []

    //create filter object
    filterFields.map((x) => {
      data[x].type.value !== 'noFilter' && filters.push({
        field: data[x].accessor ,
        subField: data[x].subAccessor,
        filterType: data[x].type.value,
        operator:  data[x].type.operator, 
        value: typeof (data[x].value) === 'string' ? data[x].value : data[x].value.map((y) => y.value),
        secondValue: data[x].secondValue ? data[x].secondValue : '' 
      })})
    
    //create string query 
    const queryObj = {}
    filters.map((x) => {
      if (x.filterType === 'range') {
        Object.assign(queryObj, {
          [x.field]: { [x.operator[0]]: x.value, [x.operator[1]]: x.secondValue }
        })
      }else if (x.subField) {
        Object.assign(queryObj, { [`${x.field}.${x.subField}`]: { [x.operator]: x.value } })
      }else{ 
        Object.assign(queryObj, {[x.field]: { [x.operator]: x.value } })
      }
    })

    //query DB
    const record = await Agent.find(queryObj)
    res.status(200).send({record,filters});

  } catch (error) {
    console.error(error);
    res.status(400).send('server error')
  }
});

// @route: GET /api/profile/filterOptions/agentPros;
// @desc: Get options for filter fields used by filter filtersModal comp (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/filterOptions/agentPros', async ({ params: { query } }, res) => {
  const options = {}
  try {
    const record = await Office.find({})
    office = record.map((office) => { return { value: office.officeId, label: office.name}})
    options.office = office
    options.status = [
      { value: 'new', label: 'Lead' },
      { value: 'prospect', label: 'Prospect' },
      { value: 'pending', label: 'Pending' },
      { value: 'agent', label: 'Agent' },
      { value: 'notInterested', label: 'Not Interested' }
    ];
    options.zip = zipcodeOptions
    options.area = areaOptions
    res.status(200).send(options);
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
    console.log(err)
  }
});

// @route: GET /api/profile/agentPros/pastSales/:id;
// @desc: Get past sales for record by id
// @ access: Public * ToDo: update to make private
router.get('/agentPros/pastSales/:agentId', async (req, res) => {
  try {
    const agentId = req.params.agentId
    const lead = {}
    const agentSellsPromise = singleFamilySalesModel.find({ agentId: agentId })
    const agentBuysPromise = singleFamilySalesModel.find({ sellingAgentId: agentId })
    const agentMultiSalesPromise = multiSalesModel.find({ agentId: agentId })
    const [agentSellsResult, agentBuysResult, agentMultiSalesResult] = await Promise.all([agentSellsPromise, agentBuysPromise, agentMultiSalesPromise])
    lead.sellersAgent = agentSellsResult
    lead.buyersAgent = agentBuysResult
    lead.multiSales = agentMultiSalesResult
    res.status(200).send(lead);
  } catch (error) {
    console.error(error);
    res.status(400).send('server error')
  }
});

//add post new note
// @route: POST /api/profile/addNotes/:profileType;
// @desc: save filter section as filter or audiance   
// @ access: Private
router.post('/addNote/agentPros/:id', auth, async (req, res) => {
  try {
    id = req.params.id
    const record = await Agent.findById(id).populate('notes.user')
    const newNote = {
      ...req.body,
      user: req.user,
      type: 'note'
    }
    record.notes.push(newNote)
    await record.save()
    res.status(200).send(record);
  } catch (err) {
    res.status(400).send('server error')
    console.log(err)
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
    console.log(err)
  }
});



module.exports = router;