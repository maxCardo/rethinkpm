const express = require('express')

const {schShowcase} = require('../../../3ps/rentmanager')


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

// @route: delete /api/showcase/flagdeal
// @desc: delete deal from showcase list
// @ access: Public * ToDo: update to make private
router.delete('/flagdeal/:deal_id', async (req, res) => {
    try {
        const prop = await Showcase.deleteOne({_id: req.params.deal_id})
        res.status(200).send(prop)
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
        const deals = await Showcase.find().populate('deal_id')
        res.status(200).send(deals)
    } catch (err) {
        res.status(500).send(err)
    }    
});

// @route: delete /api/showcase/showcasedeals
// @desc: delete showcase deal (in dev??)
// @ access: Public * ToDo: update to make private
router.delete('/showcasedeals', async (req, res) => {
    try {
        console.log('testing api get showcase deals: ')
        const deals = await Showcase.find().populate('deal_id')
        console.log('all records: ', deals)
        res.status(200).send(deals)
    } catch (err) {
        res.status(500).send(err)
    }    
});

// @route: delete /api/showcase/sch
// @desc: create ticket in RM ans sch deal viewing
// @ access: Public * ToDo: update to make private
router.post('/sch', async (req, res) => {
    try {

        const deal_id = req.body.property._id
        //tasks: 
         // - update note on deal that appointment was set ie ticket opened. add issue number
         // create ticket in RM, return issue number with success to add to notification and log
        const rmIssue = await schShowcase(req.body)
        console.log('rm reture: ', rmIssue[0].ServiceManagerIssueID)
        const dealRec = await Showcase.findOne({deal_id})
        dealRec.history.push({type:'log', content: `Scheduled Appointment: Issue #${rmIssue[0].ServiceManagerIssuesID}`})
        const record = await dealRec.save()
        //dispath issue number back to client state
        res.status(200).send({task: rmIssue[0].ServiceManagerIssueID, record})
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }    
});



module.exports = router