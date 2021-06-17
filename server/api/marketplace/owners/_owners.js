const express = require('express');
const auth = require('../../../middleware/auth');
const {getOwnerData} = require('./script')


const router = express.Router();

//router.use(auth);


// @route: GET api/marketplace/owners
// @desc: get data on owner of a listing
// @ access: private
router.get('/:id/:type', async (req, res) => {
    try {
        console.log('owner id api fired', req.params.type);
        const data = await getOwnerData(req.params.id, req.params.type)
        res.status(200).send(data)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
      
})


module.exports = router;