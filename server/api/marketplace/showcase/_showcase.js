
const express = require('express')

const Showcase = require('../../../db/models/sales/Showcase')





const router = express.Router()



// @route: GET /api/showcase/test
// @desc: Filter the listings (pageSize functionality is not currently being utilized ny the front end)
// @ access: Public * ToDo: update to make private
router.post('/test', async (req, res) => {
    try {
        console.log('testing api res on showcase deals: ', req.body)
        const recObj = {
            listName: 'testing',
            dealId: req.body, 
            status: 'active',
            history: []
        }
        const log = {type: 'log', content: 'deal flaged'}
        recObj.history.push(log)
        const showcase = new Showcase(recObj)
        const rec = await showcase.save()
        console.log('saved record: ', rec)
        res.status(200).send(rec)
    } catch (err) {
        res.status(500).send(err)
    }
    
});




module.exports = router