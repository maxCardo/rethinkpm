
const express = require('express')

const Showcase = require('../../../db/models/sales/ShowcaseList')





const router = express.Router()



// @route: GET /api/showcase/test
// @desc: save new flaged deal
// @ access: Public * ToDo: update to make private
router.post('/flagdeal', async (req, res) => {
    try {
        console.log('testing api res on showcase deals: ', req.body)
        const recObj = {
            listName: 'testing',
            deal_id: req.body.id, 
            status: 'active',
            history: []
        }
        const log = {type: 'log', content: 'deal flaged'}
        recObj.history.push(log)
        const showcase = new Showcase(recObj)
        const rec = await showcase.save()
        console.log('saved record: ', rec)
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
        console.error(err);
    }
    
});

// @route: GET /api/showcase/showcasedeals
// @desc: get all showcase deals
// @ access: Public * ToDo: update to make private
router.get('/showcasedeals', async (req, res) => {
    try {
        console.log('testing api get showcase deals: ')
        const deals = await Showcase.find().populate('deal_id')
        console.log('all records: ', deals)
        res.status(200).send(deals)
    } catch (err) {
        res.status(500).send(err)
    }    
});




module.exports = router