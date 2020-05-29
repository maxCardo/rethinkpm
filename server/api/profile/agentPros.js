const express = require('express');
const auth = require('../../middleware/auth')

const Agent = require('../../db/models/sales/agent')
const Office = require('../../db/models/sales/office')


//filter options: refactor to get these from api
const zipcodeOptions = require('../../config/supportData/zipcodes')
const areaOptions = require('../../config/supportData/areas')


const router = express.Router();

// @route: GET /api/profile/agentPros;
// @desc: Get single profile when loading profile screen (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/', async (req, res) => {
    try {
        const record = await Agent.findOne().populate('notes.user, office')
        res.status(200).send(record);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: PUT /api/profile/agentPros/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/:id", async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id)
        await agent.set({
            ...agent,
            ...req.body
        })
        //var result = await agent.save();
        res.status(200).send(agent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/agentPros/editEmail/:id;
// @desc: Update profile email
// @ access: Public * ToDo: update to make private
router.put("/editEmail/:id", async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id)
        await agent.set({
            ...agent,
            email: req.body.email
        })
        //var result = await agent.save();
        res.status(200).send(agent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/agentPros/editPhone/:id;
// @desc: Update profile phone
// @ access: Public * ToDo: update to make private
router.put("/editPhone/:id", async (req, res) => {
    try {

        if (req.body.phoneNumbers) {
            //req.body.phoneNumbers.map(async (record) => record.phoneType = await validateNum(record.number))
        }
        let agent = await Agent.findById(req.params.id)
        await agent.set({
            ...agent,
            ...req.body
        })
        var thereq = req.body;
        //var result = await agent.save();
        res.status(200).send(agent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/agentPros/editStatus/:id;
// @desc: Update profile status
// @ access: Public * ToDo: update to make private
router.put("/editStatus/:id", async (req, res) => {
    try {
        let agent = await Agent.findById(req.params.id)
        await agent.set({
            ...agent,
            status: req.body.status
        })
        //var result = await agent.save();
        res.status(200).send(agent);
    } catch (err) {
        res.status(500).send(err);
    }
});



// @route: GET /api/profile/agentPros/filter;
// @desc: Get get new profile list based on filter submited
// @ access: Public * ToDo: update to make private
router.post('/filter/:page?', async (req, res) => {
    try {
        const PAGESIZE = 500;
        const data = req.body
        const filterFields = Object.keys(req.body);
        const filters = []

        //create filter object
        filterFields.map((x) => {
            data[x].type.value !== 'noFilter' && filters.push({
                field: data[x].accessor,
                subField: data[x].subAccessor,
                filterType: data[x].type.value,
                operator: data[x].type.operator,
                value: typeof (data[x].value) === 'string' ? data[x].value : data[x].value.map((y) => y.value),
                secondValue: data[x].secondValue ? data[x].secondValue : ''
            })
        })

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


        //query DB
        let record;
        if (req.params.page) {
            record = await Agent.find(queryObj).populate('notes.user, office').skip(PAGESIZE * (+req.params.page)).limit(PAGESIZE + 1)
        } else {
            record = await Agent.find(queryObj).populate('notes.user, office').limit(PAGESIZE + 1)
        }
        let hasMore = false;
        if (record.length > PAGESIZE) {
            hasMore = true;
            record.pop()
        }

        res.status(200).send({ record, filters, hasMore });

    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});


// @route: GET /api/profile/filterOptions/agentPros;
// @desc: Get options for filter fields used by filter filtersModal comp (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/filterOptions', async ({ params: { query } }, res) => {
    const options = {}
    try {
        const record = await Office.find({})
        office = record.map((office) => { return { value: office.officeId, label: office.name } })
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

// @route: GET /api/profile/agentPros/pastSales/:id;
// @desc: Get past sales for record by id
// @ access: Public * ToDo: update to make private
router.get('/pastSales/:agentId', async (req, res) => {
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
// @route: POST /api/profile//profileType/addNotes/:id;
// @desc: save filter section as filter or audiance   
// @ access: Private
router.post('/addNote/:id', auth, async (req, res) => {
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




module.exports = router;  