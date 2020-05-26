const express = require('express');
const auth = require('../../middleware/auth')

const BuyerPros = require('../../db/models/prospects/BuyerPros')

const router = express.Router();

const model = BuyerPros



// @route: POST /api/profile/buyerPros;
// @desc: POST new BuyerPros from postman
// @ access: Public 
router.post('/', async (req, res) => {
    const {firstName, lastName, phoneNumber, email, listing} = req.body
    const record = await new model({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        phoneNumbers: [{
            number: phoneNumber,
            isPrimary: true,
            okToText: true
        }],
        email:[{
            address: email, 
            isPrimary: true
        }],  
        inqListing :[{
            listing
        }]
    })
    await record.save()
    res.status(200).send('hell ya')
})


// @route: GET /api/profile/buyerPros;
// @desc: Get single profile when loading profile screen
// @ access: Public * ToDo: update to make private
router.get('/', async (req, res) => {
    try {
        const record = await model.findOne()
        console.log(record);
        res.status(200).send(record);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
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
            record = await model.find(queryObj).skip(PAGESIZE * (+req.params.page)).limit(PAGESIZE + 1)
        } else {
            record = await model.find(queryObj).limit(PAGESIZE + 1)
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
        options.status = [
            { value: 'new', label: 'Lead' },
            { value: 'prospect', label: 'Prospect' },
            { value: 'pending', label: 'Pending' },
            { value: 'agent', label: 'Agent' },
            { value: 'notInterested', label: 'Not Interested' }
        ];
        res.status(200).send(options);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});


//add post new note
// @route: POST /api/profile/profileType/addNote/:id;
// @desc: save filter section as filter or audiance   
// @ access: Private
router.post('/addNote/:id', auth, async (req, res) => {
    try {
        id = req.params.id
        const record = await model.findById(id).populate('notes.user')
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