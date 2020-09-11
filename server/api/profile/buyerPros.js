const express = require('express');
const auth = require('../../middleware/auth')
const {addIdxUser} = require('../../3ps/idx')

const BuyerPros = require('../../db/models/prospects/BuyerPros')

const Pipeline = require('../../db/models/sales/Pipeline')
const SalesListings = require('../../db/models/sales/SalesListings')
const FilterModel = require('../../db/models/prospects/filters')
const AudienceModel = require('../../db/models/prospects/audience')
const NoteModel = require('../../db/models/common/Note')



//filter options: refactor to get these from api
const zipcodeOptions = require('../../config/supportData/zipcodes')
const areaOptions = require('../../config/supportData/areas')

const router = express.Router();

const model = BuyerPros

router.use(auth)


// @route: GET /api/profile/buyerPros;
// @desc: Add email address to profile
// @ access: Public * ToDo: update to make private
router.post("/pipeline", async (req, res) => {
    try {
        let buyerId =req.body.buyerId;
        let pipeline = await Pipeline.find({ "buyer": buyerId});
        let listings = [];

        for (i = 0; i < pipeline.length; i++) {
            const listing = await SalesListings.find({"_id": pipeline[i].deal});
            listings.push(listing[0]);
        }
        let buyer = await model.findById(buyerId);
            console.log(buyer);
        res.status(200).send(listings);
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});


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
router.post("/addLead",auth, async (req, res) => {
    try {
        let recordObj = req.body
        const { firstName, lastName, preApproved, email: emails} = req.body
        recordObj.fullName = `${firstName} ${lastName}`
        recordObj.preApproved =  {status: preApproved}
        const record = new model(recordObj);
        const newNote = {
            content: 'New user manualy created.',
            user: req.user,
            type: 'log'
        }
        await record.notes.push(newNote)
        let email = emails.filter((email) => email.isPrimary)[0]
        if (!email) {
            email = emails[0]
        }
        const {newID} = await addIdxUser({firstName, lastName, email: email.address})
        record.idxId = newID
        await record.save();
        res.status(200).send(record);
    } catch (err) {
        console.error(err);
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
        buyer.phoneNumbers = newPhoneNumbers
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
        buyer.phoneNumbers = req.body.phoneNumbers
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

        buyer.email = newEmails
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
        buyer.email = req.body.email
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
        buyer.status = req.body.status
        await buyer.save();
        res.status(200).send(buyer);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: GET /api/profile/agentPros/filter;
// @desc: Get get new profile list based on filter submited
// @ access: Public * ToDo: update to make private
router.post('/filter', async (req, res) => {
    try {
        const PAGESIZE = req.body.pageSize;
        const data =  req.body.filters
        const filterFields = Object.keys( req.body.filters);
        const filters = []
        if(data.length) {
          filters = data
        } else {
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
        }

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
          if(PAGESIZE) {
            record = await model.find(queryObj).skip(PAGESIZE * (+req.body.page)).limit(PAGESIZE + 1)
          } else {
            record = await model.find(queryObj)
          }
        } else {
            record = await model.find(queryObj).limit(PAGESIZE + 1)
        }
        let hasMore = false;
        if (record.length > PAGESIZE) {
            hasMore = true;
            record.pop()
        }

        record = await Promise.all(record.map(async (buyer) => {
          const notesPopulated = await  Note.populate(buyer.notes, {path: 'user', select: 'name'})
          buyer.notes = notesPopulated

          return buyer
        }))

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
        options.zip = zipcodeOptions;
        options.area = areaOptions;
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
  res.json({result: 'ok'})
})

module.exports = router;  