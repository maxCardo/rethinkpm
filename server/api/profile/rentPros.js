const express = require('express');
const auth = require('../../middleware/auth')

const RentPros = require('../../db/models/prospects/RentLeads/RentLeadPros')
const RentInq = require('../../db/models/prospects/RentLeads/RentLeadInq')


const router = express.Router();



// @route: GET /api/profile/rentPros/test;
// @desc: Get 
// @ access: Public 
router.get('/test', (req,res) => {
        console.log(req.body);

    res.status(200).send('hell ya')
})


// @route: GET /api/profile/agentPros;
// @desc: Get single profile when loading profile screen (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/', async (req, res) => {
    try {
        const record = await RentInq.findOne().populate('prospect')
        const newObj = await Object.assign(record, record.prospect)
        console.log(newObj);



        res.status(200).send(record);
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});


module.exports = router;