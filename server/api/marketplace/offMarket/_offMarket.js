const express = require('express');
const auth = require('../../../middleware/auth');

const ListLeads = require('../../../db/models/sales/ListLeads')


const router = express.Router();

// @route: Get api/marketplace/off_market/seller_pipeline/:id
// @desc: get pipeline deals for a buyerPros
// @ access: private
router.get('/seller_pipeline/:id', async (req, res) => {
    try {
        console.log('firing seller pipeline');
        let sellerId = req.params.id;
        let pipeline = await ListLeads.find({ "pros": sellerId }).populate('comp')
        res.status(200).send(pipeline)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})



module.exports = router;