const express = require('express');
const auth = require('../../middleware/auth')

const RentPros = require('../../db/models/prospects/RentLeads/RentPros')
const RentInq = require('../../db/models/prospects/RentLeads/RentInq')
const FilterModel = require('../../db/models/sales/filters')
const AudienceModel = require('../../db/models/sales/audience')


const router = express.Router();

const model = RentInq
const prosModel = RentPros

// @route: Post /api/profile/rentPros;
// @desc: create new prospect from postman for testing
// @ access: Public
router.post('/', async (req, res) => {
    try {
        const {firstName,lastName, phoneNumber, email, property} = req.body

        // check if user exist and get user or create new if user does not exist
        let pros;
        phoneNumber ? pros = await prosModel.findOne({ 'phone.number': phoneNumber }) : pros = await prosModel.findOne({ email: email.address })

        // validate phone number
        //if (phoneNumber) pros.phone.phoneType = await validateNum(phoneNumber);

        console.log(phoneNumber);

        if (!pros) {
            pros = await new prosModel({
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                email: {
                    address: email,
                    isPrimary: true
                },
                phoneNumbers:{
                    number: phoneNumber.slice(2),
                    isPrimary: true,
                    okToText: true
                }
            });
        };
        
        //check if lead for this asset exist or create new
        let inq = await model.findOne({ prospect: pros._id, listing: property });

        if (!inq) {
            inq = await new RentInq({
                prospect: pros._id,
                campaign: property,

            })
        };

        console.log(inq);
        await inq.save();
        await pros.save();
        res.status(200).send(inq);
    } catch (e) {
        console.error(e);
        res.status(400).json({ errors: [{ msg: 'somthing went wrong' }] });
    }
});


// @route: GET /api/profile/rentPros;
// @desc: Get single profile when loading profile screen
// @ access: Public * ToDo: update to make private
router.get('/', async (req, res) => {
    try {
        const inq = await model.findOne().populate('prospect notes.user')
        const clone = { ...inq.prospect._doc, ...inq._doc }
        const test = {
            inq,
            clone
        }
        delete clone.prospect
        res.status(200).send(clone);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: PUT /api/profile/rentPros/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/:id", async (req, res) => {
    try {

        if (req.body.phoneNumbers) {
            //req.body.phoneNumbers.map(async (record) => record.phoneType = await validateNum(record.number))
        }
        const renter = await model.findById(req.params.id)
        let rentPro = await prosModel.findById(renter.prospect);
        await rentPro.set({
            ...renter,
            ...req.body
        })
        var thereq = req.body;
        var result = await rentPro.save();
        res.status(200).json({rentPro});
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/rentPros/addPhone/:id;
// @desc: Add a new phone number to rentPro
// @ access: Public * ToDo: update to make private
router.put("/addPhone/:id", async (req, res) => {
    try {
         //req.body.phoneNumbers.map(async (record) => record.phoneType = await validateNum(record.number))

        const inq = await model.findById(req.params.id)
        let rentPro = await prosModel.findById(inq.prospect);

        let newPhoneNumbers;
        if (req.body.isPrimary) {
            newPhoneNumbers = rentPro.phoneNumbers.map((item) => {
                if (item.isPrimary) {
                    item.isPrimary = false
                }
                return item;
            });
            newPhoneNumbers.push(req.body);
        } else {
            newPhoneNumbers = rentPro.phoneNumbers
            newPhoneNumbers.push(req.body);
        }

        await rentPro.set({
            ...inq,
            phoneNumbers: newPhoneNumbers
        })
        //var result = await rentPro.save();
        res.status(200).send(rentPro);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/rentPros/editPhone/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/editPhone/:id", async (req, res) => {
    try {

        if (req.body.phoneNumbers) {
            //req.body.phoneNumbers.map(async (record) => record.phoneType = await validateNum(record.number))
        }
        const renter = await model.findById(req.params.id)
        let rentPro = await prosModel.findById(renter.prospect);
        await rentPro.set({
            ...rentPro,
            phoneNumbers: req.body.phoneNumbers
        })
        var thereq = req.body;
        //var result = await rentPro.save();
        res.status(200).send(rentPro);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/rentPros/addEmail/:id;
// @desc: Add email address to profile
// @ access: Public * ToDo: update to make private
router.put("/addEmail/:id", async (req, res) => {
    try {
        let inq = await model.findById(req.params.id)
        let rentPro = await prosModel.findById(inq.prospect);
        let newEmails;

        if (req.body.isPrimary) {
            newEmails = rentPro.email && rentPro.email.map((item) => {
                if (item.isPrimary) {
                    item.isPrimary = false
                }
                return item;
            });
            newEmails.push(req.body);
        } else {
            newEmails = rentPro.email && rentPro.email
            newEmails.push(req.body);
        }

        await rentPro.set({
            ...inq,
            email: newEmails
        })
        //var result = await buyer.save();
        res.status(200).send(rentPro);
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/rentPros/editEmail/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/editEmail/:id", async (req, res) => {
    try {
        const renter = await model.findById(req.params.id)
        let rentPro = await prosModel.findById(renter.prospect);
        await rentPro.set({
            ...rentPro,
            email: req.body.email
        })
        var thereq = req.body;
        //var result = await rentPro.save();
        res.status(200).send(rentPro);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route: PUT /api/profile/rentPros/editStatus/:id;
// @desc: Update profile info, should work with any filed in schema
// @ access: Public * ToDo: update to make private
router.put("/editStatus/:id", async (req, res) => {
    try {

        const rentLead = await model.findById(req.params.id)
        await rentLead.set({
            ...rentLead,
            status: req.body.status
        })
        var thereq = req.body;
        //var result = await rentPro.save();
        res.status(200).send(rentLead);
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
            record = await model.find(queryObj).populate('prospect notes.user').skip(PAGESIZE * (+req.params.page)).limit(PAGESIZE + 1)
        } else {
            record = await model.find(queryObj).populate('prospect notes.user').limit(PAGESIZE + 1)
        }
        let hasMore = false;
        if (record.length > PAGESIZE) {
            hasMore = true;
            record.pop()
        }

        record = await record.map((inq) => {
            const clone = { ...inq.prospect._doc, ...inq._doc }
            delete clone.prospect
            return clone
        })

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
        const inq = await model.findById(id).populate('prospect notes.user')
        const newNote = {
            ...req.body,
            user: req.user,
            type: 'note'
        }
        inq.notes.push(newNote)
        await inq.save()
        const clone = { ...inq.prospect._doc, ...inq._doc }
        delete clone.prospect
        res.status(200).send(clone);
    } catch (err) {
        res.status(400).send('server error')
        console.error(err)
    }
});






module.exports = router;