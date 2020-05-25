const express = require('express');
const auth = require('../../middleware/auth')


const router = express.Router();



// @route: GET /api/profile/rentPros/test;
// @desc: Get 
// @ access: Public 
router.get('/test', (req,res) => {
        console.log(req.body);

    res.status(200).send('hell ya')
}
)


module.exports = router;