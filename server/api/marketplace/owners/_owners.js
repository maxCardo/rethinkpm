const express = require('express');
const auth = require('../../../middleware/auth');
const {getOwnerData} = require('./script')


const router = express.Router();

//router.use(auth);


// @route: GET api/marketplace/owners
// @desc: get data on owner of a listing
// @ access: private
router.get('/:id', async (req, res) => {
    try {
        const data = await getOwnerData(req.params.id)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
      
})


module.exports = router;