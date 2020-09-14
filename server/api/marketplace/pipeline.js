const express = require('express');
const auth = require('../../middleware/auth');
const SalesListings = require('../../db/models/sales/SalesListings');
const BuyerPros = require('../../db/models/prospects/BuyerPros');
const Pipeline = require('../../db/models/sales/Pipeline');


const router = express.Router();

router.use(auth);


// @route: 
// @desc:
// @ access: Public


module.exports = router;
