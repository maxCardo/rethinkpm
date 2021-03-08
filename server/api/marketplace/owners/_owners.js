const express = require('express');
const auth = require('../../../middleware/auth');
const {} = require('./scripts')


const router = express.Router();

//router.use(auth);


// @route: GET api/marketplace/owners
// @desc: get data on owner of a listing
// @ access: private
router.get('/', async (req, res) => {


    
})


module.exports = router;