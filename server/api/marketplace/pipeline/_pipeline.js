const { sendEmail } = require('../../../3ps/email')
const express = require('express');
const auth = require('../../../middleware/auth');
const SalesListings = require('../../../db/models/sales/SalesListings');
const Pipeline = require('../../../db/models/sales/Pipeline');
const BuyerPros = require('../../../db/models/prospects/BuyerPros')
const {addIdxListing, removeIdxListing, getIdxSavedListings} = require('../../../3ps/idx')
const {emailTemplate} = require('../../../templets/recommendProps')
const {syncPipeline} = require('./scripts')


const router = express.Router();

//router.use(auth);

// @route: Get api/marketplace/pipeline
// @desc: get pipeline deals for a buyerPros
// @ access: private
router.get('/', async (req, res) => {
    console.log('calling buyer pipeline');
    try {
        let pipeline = await Pipeline.find({}).populate({ path: 'deal', populate: { path: 'compReport', populate: { path: 'comps.listing_id'}}})
        console.log('pipeline: ', pipeline);
        res.status(200).send(pipeline)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: Get api/marketplace/pipeline
// @desc: get pipeline deals for a buyerPros
// @ access: private
router.get('/:id', async (req, res) => {
    console.log('get buyer pipeline 2');
 try {
    let buyerId = req.params.id;
     let pipeline = await Pipeline.find({ "buyer": buyerId }).populate({ path: 'deal', populate: { path: 'compReport', populate: { path: 'comps.listing_id' } } })
    res.status(200).send(pipeline)   
 } catch (err) {
    console.error(err);
    res.status(500).send(err)
 }})

 // @route: Put api/marketplace/pipeline/trash
// @desc: update deal status
// @ access: private
router.put('/status', async (req, res) => {
    try { 
        //TODO: change status from recommend to dead
        const {id,action} = req.body
        let deal = await Pipeline.findById(id).populate('deal', 'listNumber').populate('buyer', 'idxId')
        if (action === 'liked') {
            const idxDealId = await addIdxListing(deal.buyer.idxId, deal.deal.listNumber)
            deal.idxDealId = idxDealId
        }else if (action === 'dead' && deal.status === 'liked') {
            console.log(deal.buyer.idxId, deal.idxDealId);
            removeIdxListing(deal.buyer.idxId, deal.idxDealId)            
        }
        deal.history.push({
            event: 'updated status',
            statusFrom: deal.status,
            statusTo: action,
            note: 'agent manual updated deal from app',
        });
        deal.status = action;
        await deal.save()
        res.status(200).send(deal)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: GET /api/marketplace/pipeline/sync;
// @desc: Sync and update buyer pipeline deals with website
// @ access: private * ToDo: update to make private
router.get('/sync/:id', async (req, res) => {
    try { 
        const pipeline = await syncPipeline(req.params.id)
        console.log('pipeline: ', pipeline.filter(record => record.status === 'liked').map(record => record.deal.listNumber))
        res.status(200).send(pipeline)
    } catch (err) {
        console.error(err)
        res.status(500).send('err');
    }
});

// @route: POST api/marketplace/pipeline/testRecommend
// @desc: recomend propertie(s) to buyer(s) with email templet
// @ access: private
router.post('/recommend', async (req, res) => {
    try {
        const { properties, buyers: buyersId, customMessage, agentId } = req.body
        const propertiesFetched = await Promise.all(properties.map((propertyId => SalesListings.findById(propertyId))))
        const buyers = await Promise.all(buyersId.map((buyerId) => BuyerPros.findById(buyerId)))
        buyers.forEach(async (buyer) => {
            //ToDo add beter workflow for recomendig a propety twice
            const propertyLinks = []
            for (let property of propertiesFetched) {
                const propertyId = property._id
                let deal = await Pipeline.findOne({ buyer: buyer._id, deal: propertyId })
                if (!deal) {
                    deal = await new Pipeline({
                        buyer: buyer._id,
                        agent: req.user,
                        deal: propertyId,
                        status: 'recommend',
                        history: [
                            {
                                event: 'recommend',
                                statusTo: 'recommend',
                            },
                        ],
                    });
                } else {
                    deal.status = 'recommend'
                    deal.history.push({
                        event: 'recommend',
                        statusTo: 'recommend',
                        statusFrom: deal.status,
                        note: 'property rerecomended from marketplace'
                    })
                }
                await deal.save();
                propertyLinks.push(`<a href='http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${deal._id}&mode=recommend'>${property.streetNumber} ${property.streetName}</a>`)
            }
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            const html = await emailTemplate(propertiesFetched, customMessage);
            sendEmail(buyerEmail.address, subject, customMessage, html)
        })
        res.status(200).send('ok')
    } catch (err) {
        console.error(err);
        res.status(500).send('server error')
    }
})

// @route: GET api/marketplace/pipeline/testRecommend
// @desc: serve up recomend email templet for testing with sample data
// @ access: private
router.get('/render/testRecommend', async (req, res) => {
    const properties = await SalesListings.find({propertyType: 'res'}).sort([['listDate', -1]]).limit(20)
    const customMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    const html = await emailTemplate(properties, customMessage);
    res.send(html)
})


module.exports = router;
