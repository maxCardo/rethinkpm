const express = require('express')
const auth = require('../../middleware/auth')
const { sendEmail } = require('../../3ps/email')
const SalesListings = require('../../db/models/sales/SalesListings')
const BuyerPros = require('../../db/models/prospects/BuyerPros')
const Pipeline = require('../../db/models/sales/Pipeline')
const MarketFilter = require('../../db/models/sales/MarketFilter')

const router = express.Router()

router.use(auth)

//filter options: refactor to get these from api
const zipcodeOptions = require('../../config/supportData/zipcodes')
const areaOptions = require('../../config/supportData/areas')

// @route: post /api/marketPlace/ops/recommend
// @desc: 
// @ access: Public 
router.post('/recommend', auth, async (req, res) => {
    try {
        const { property: propertyId, buyers: buyersId, customMessage, agentId } = req.body
        const property = await SalesListings.findById(propertyId)
        const buyers = await Promise.all(buyersId.map((buyerId) => BuyerPros.findById(buyerId)))
        buyers.forEach(async (buyer) => {
            const deal = await new Pipeline({
                buyer: buyer._id,
                agent: req.user,
                deal: propertyId,
                status: 'recommend',
                history: [
                    {
                        event: 'recommend',
                        statusTo: 'recommend',

                    }
                ]
            })
            await deal.save()
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            const html = `
                <p>${customMessage}</p>
                <a href='http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${deal._id}&mode=recommend'>Property</a>
            `

            sendEmail(buyerEmail.address, subject, customMessage, html)
        })
        res.json({ ok: true })
    } catch (err) {
        console.error(err);
        res.status(500).send('server error')
    }
})

// @route: post /api/marketPlace/ops/filters
// @desc: 
// @ access: Public 
router.post('/filters', async (req, res) => {
  const {name, filters} = req.body
  const marketFilter = new MarketFilter({name, filters})
  await marketFilter.save()
  res.send({ok: true})
})

// @route: get /api/marketPlace/ops/filters
// @desc: 
// @ access: Public 
router.get('/filters', async (req, res) => {
  const filters = await MarketFilter.find({})
  res.send({filters})
})

router.post('/filters/:filterId/blacklist', async (req, res) => {
  const {filterId} = req.params;
  const {listingId} = req.body;
  const marketFilter = await MarketFilter.findById(filterId)
  marketFilter.blacklist.push(listingId)
  await marketFilter.save()
})
;




// @route: GET /api/marketplace/ops/filterOptions
// @desc: Get options for filter fields used by filter filtersModal comp (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/filterOptions', async (req, res) => {
  const options = {}
  try {
      options.zip = zipcodeOptions
      options.area = areaOptions
      res.status(200).send(options);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

router.post('/listings/:listingId/addCondition', async (req,res) => {
  const {listingId} = req.params
  const {condition} = req.body
  await SalesListings.findByIdAndUpdate(listingId, {$set: {condition}})
})

module.exports = router