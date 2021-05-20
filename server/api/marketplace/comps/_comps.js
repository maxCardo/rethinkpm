const express = require('express');
const auth = require('../../../middleware/auth');

const ListLeads = require('../../../db/models/sales/ListLeads')
const LeadCompReport = require('../../../db/models/sales/LeadCompReport')
const SellerPros = require('../../../db/models/prospects/SellerPros')


const router = express.Router();

// @route: Get api/marketplace/comps/comp/like
// @desc: Like Deal in CompRep 
// @ access: private
router.get('/comp/like', async (req, res) => {
    try {
        res.status(200).send('liked prop')
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: Get api/marketplace/comps/comp/unlike
// @desc: Unlike Deal in CompRep 
// @ access: private
router.get('/comp/unlike', async (req, res) => {
    try {
        res.status(200).send('unliked prop')
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: PUT api/marketplace/comps/comp/update????
// @desc: adjust info for comp in salesListing (for comp), adjust pricing model on compRep 
// @ access: private
router.put('/comp/update/:comp??', async (req, res) => {
    try {
        res.status(200).send('done')
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: PUT api/marketplace/comps/submit_report
// @desc: 
// @ access: private
router.put('/submit_report', async (req, res) => {
    try {
        res.status(200).send('done')
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})





module.exports = router;