const express = require('express');
const auth = require('../../middleware/auth')

const BuyerPros = require('../../db/models/prospects/BuyerPros')
const FilterModel = require('../../db/models/sales/filters')
const AudienceModel = require('../../db/models/sales/audience')

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
            number: phoneNumber.slice(2),
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

// @route: POST /api/profile/buyerPros/addLead;
// @desc: Add a Buyer record
// @ access: Public * ToDo: update to make private
router.post("/addLead", async (req, res) => {
    try {
        const buyer = new model();
        await buyer.set({
            ...buyer,
            ...req.body
        });

        /*TODO: hardcode leadsource here*/
        //var result = await agent.save();
        res.status(200).send(buyer);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: GET /api/profile/buyerPros;
// @desc: Get single profile when loading profile screen
// @ access: Public * ToDo: update to make private
router.get('/', async (req, res) => {
    try {
        const record = await model.findOne()
        res.status(200).send(record);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

//TODO: add general edit route for update profile modal

// @route: PUT /api/profile/agentPros/addPhone/:id;
// @desc: Add phone number to profile
// @ access: Public * ToDo: update to make private
router.put("/addPhone/:id", async (req, res) => {
    try {
        let { number, isPrimary, okToText } = req.body
        let buyer = await model.findById(req.params.id)
        let newPhoneNumbers =[];
        if (isPrimary) {
            newPhoneNumbers = buyer.phoneNumbers && buyer.phoneNumbers.map((item) => {
                if (item.isPrimary) {
                    item.isPrimary = false
                }
                return item;
            });
            newPhoneNumbers.push(req.body);
        } else {
            buyer.phoneNumbers.length ? newPhoneNumbers = buyer.phoneNumbers : isPrimary = true
            newPhoneNumbers.push({ number, isPrimary, okToText });
        }

        await buyer.set({
            ...buyer,
            phoneNumbers: newPhoneNumbers
        })
        await buyer.save();
        res.status(200).send(buyer);
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/buyerPros/editPhone/:id;
// @desc: Update buyerPros phone
// @ access: Public * ToDo: update to make private
router.put("/editPhone/:id", async (req, res) => {
    try {
        if (!req.body.phoneNumbers.length) { throw "can not edit email" }
        //ToDo: validte number and add numType to phone record
        const buyer = await model.findById(req.params.id)
        await buyer.set({
            ...buyer,
            ...req.body
        })
        await buyer.save();
        res.status(200).send({buyer});
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/buyerPros/addEmail/:id;
// @desc: Add email address to profile
// @ access: Public * ToDo: update to make private
router.put("/addEmail/:id", async (req, res) => {
    try {
        let {address, isPrimary} = req.body
        let buyer = await model.findById(req.params.id)
        let newEmails = [];

        if (isPrimary) {
            newEmails = buyer.email && buyer.email.map((item) => {
                if (item.isPrimary) {
                    item.isPrimary = false
                }
                return item;
            });
            newEmails.push(req.body);
        } else {
            buyer.email.length ? newEmails = buyer.email : isPrimary = true
            newEmails.push({address, isPrimary});
        }

        await buyer.set({
            ...buyer,
            email: newEmails
        })  
        await buyer.save();
        res.status(200).send(buyer);
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});


// @route: PUT /api/profile/buyerPros/editEmail/:id;
// @desc: Update buyerPros email
// @ access: Public * ToDo: update to make private
router.put("/editEmail/:id", async (req, res) => {
    try {
        if (!req.body.email.length) { throw "can not edit email"}
        const buyer = await model.findById(req.params.id)
        await buyer.set({
            ...buyer,
            email: req.body.email
        })
        await buyer.save();
        res.status(200).send(buyer);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/buyerPros/editStatus/:id;
// @desc: Update buyerPros status
// @ access: Public * ToDo: update to make private
router.put("/editStatus/:id", async (req, res) => {
    try {
        const buyer = await model.findById(req.params.id)
        await buyer.set({
            ...buyer,
            status: req.body.status
        })

        await buyer.save();
        res.status(200).send(buyer);
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
        console.error(err)
    }
});

// @route: PUT /api/profile/buyer/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/:id", async (req, res) => {
    try {
        const buyer = await model.findById(req.params.id)
        await buyer.set({
            ...buyer,
            ...req.body
        })
        var thereq = req.body;
        //var result = await buyer.save();
        res.status(200).json({buyer});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/audiences', async (req,res) => {
  const audiences = await AudienceModel.find({profileType: 'buyerPros'})
  res.json(audiences)
})

router.get('/audiences/:id', async (req,res) => {
  const {id} = req.params
  const audience = await AudienceModel.findById(id)
  const agents = await Agent.find({'_id': {$in: audience.audience.map((id) => mongoose.Types.ObjectId(id))}})
  res.json({record: agents, filters: audience.filters})
})

router.post('/audiences', async (req,res) => {
  const {name, filters, audience} = req.body
  const audienceData = new AudienceModel({name, filters, audience, profileType: 'buyerPros'});
  await audienceData.save()
  console.log('Audience saved')
  res.json({result: 'ok'})
})

router.get('/filters', async (req,res) => {
  const filters = await FilterModel.find({profileType: 'buyerPros'})
  res.json(filters)
})

router.get('/filters/:id', async (req,res) => {
  const {id} = req.params
  const filter = await FilterModel.findById(id)
  const queryObject = convertFiltersToQuery(filter.filters)
  const agents = await Agent.find(queryObject)
  res.json({record: agents, filters: filter.filters})
})

router.post('/filters', async (req,res) => {
  const {name, filters} = req.body
  const filter = new FilterModel({name, filters,  profileType: 'buyerPros'});
  await filter.save()
  console.log('Filter saved')
  res.json({result: 'ok'})
})

module.exports = router;  