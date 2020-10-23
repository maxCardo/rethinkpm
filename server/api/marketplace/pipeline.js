const { sendEmail } = require('../../3ps/email')
const express = require('express');
const auth = require('../../middleware/auth');
const SalesListings = require('../../db/models/sales/SalesListings');
const Pipeline = require('../../db/models/sales/Pipeline');
const BuyerPros = require('../../db/models/prospects/BuyerPros')
const {addIdxListing, removeIdxListing, getIdxSavedListings} = require('../../3ps/idx')
const {emailTemplate} = require('../../templets/recommendProps')


const router = express.Router();

router.use(auth);

// @route: Get api/marketplace/pipeline
// @desc: get pipeline deals for a buyerPros
// @ access: Public
router.get('/', async (req, res) => {
    try {
        let pipeline = await Pipeline.find({}).populate('deal')
        res.status(200).send(pipeline)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: Get api/marketplace/pipeline
// @desc: get pipeline deals for a buyerPros
// @ access: Public
router.get('/:id', async (req, res) => {
 try {
    let buyerId = req.params.id;
    let pipeline = await Pipeline.find({ "buyer": buyerId }).populate('deal')
    res.status(200).send(pipeline)   
 } catch (err) {
    console.error(err);
    res.status(500).send(err)
 }})

 // @route: Put api/marketplace/pipeline/trash
// @desc: update deal status
// @ access: Public
router.put('/status', async (req, res) => {
    try { 
        //TODO: change status from recommend to dead
        const {id,action} = req.body
        let deal = await Pipeline.findById(id).populate('deal', 'listNumber').populate('buyer', 'idxId')
        if (action === 'liked') {
            const idxDealId = await addIdxListing(deal.buyer.idxId, deal.deal.listNumber)
            deal.idxDealId = idxDealId
        }else if (action === 'dead' && deal.status === 'liked') {
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
// @ access: Public * ToDo: update to make private
router.get('/sync/:id', async (req, res) => {
    try {
        console.log('got it');
        const deals = await Pipeline.find({ buyer: req.params.id }).populate('buyer').populate('deal')
        const idxDeals = await getIdxSavedListings(deals[0].buyer.idxId)
        const idxDealIds = idxDeals.data.map(record => record.property.listingID)

        const activeDeals =  deals.filter(record => record.status != 'dead').map(record => record.deal.listNumber)
        const deadDeals = deals.filter(record => record.status === 'dead').map(record => record.deal.listNumber)
        idxDealIds.map(async (id) => {
            console.log(activeDeals.includes(id));
            if (!activeDeals.includes(id)) {
                console.log(id);
                console.log('deal: ', deals.find(record => record.deal.listNumber === id)._id);
                const newDeal = await new Pipeline({
                    buyer: req.params.id,
                    deal: deals.find(record => record.deal.listNumber === id)._id,
                    status: 'liked',
                    history: [
                        {
                            event: 'liked',
                            statusTo: 'liked',
                            note: 'user liked deal from website'
                        },
                    ],
                })
                //await newDeal.save
                console.log('newDeal: ', newDeal);

            }else if (deadDeals.includes(id)) {  
                const deal = deals.find(record => record.deal.listNumber === id)
                const update = await Pipeline.findOne({_id: deal._id})
                update.active = true
                update.history.push({
                    event: 'updated status',
                    statusFrom: update.status,
                    statusTo: 'liked',
                    note: 'user reliked deal from website',
                });
                update.status = 'liked'
                console.log(update);
                //await update.save()  
            }
        })

        res.status(200).send('ok');

    } catch (err) {
        console.error(err)
        res.status(500).send('err');
    }
});

// @route: POST api/marketplace/pipeline/testRecommend
// @desc: recomend propertie(s) to buyer(s) with email templet
// @ access: Public
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

// @route: POST api/marketplace/pipeline/testRecommend
// @desc: serve up recomend email templet for testing with sample data
// @ access: Public
router.get('/testRecommend', async (req, res) => {
    const properties = await SalesListings.find().sort([['listDate', -1]]).limit(5)
    const customMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    const html = await emailTemplate(properties, customMessage);
    res.send(html)
})


module.exports = router;
