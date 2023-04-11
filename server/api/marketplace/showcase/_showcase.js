
const express = require('express')
const router = express.Router()



// @route: GET /api/showcase/test
// @desc: Filter the listings (pageSize functionality is not currently being utilized ny the front end)
// @ access: Public * ToDo: update to make private
router.post('/test', async (req, res) => {
    console.log('testing api res on showcase deals: ', req.body)
    res.status(200).send('hell ya')
});




module.exports = router