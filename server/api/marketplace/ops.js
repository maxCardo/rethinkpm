const express = require('express')
const {sendEmail} = require('../../3ps/email')
const SalesListings = require('../../db/models/sales/SalesListings')
const MarketFilter = require('../../db/models/sales/MarketFilter')

const router = express.Router()


// @route: post /api/marketPlace/ops/recommend
// @desc: 
// @ access: Public 
router.post('/recommend', async (req, res) => {
    try {
        const { property: propertyId, buyers: buyersId, customMessage } = req.body
        const property = await SalesListings.findById(propertyId)
        const buyers = await Promise.all(buyersId.map((buyerId) => BuyerPros.findById(buyerId)))
        buyers.forEach((buyer) => {
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            const html = `
                <p>${customMessage}</p>
                <a href='http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${buyer._id}&mode=recommend'>Property</a>
            `
            sendEmail(buyerEmail.address, subject, customMessage, html)
        })
        res.json({ ok: true })
    } catch (err) {
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





module.exports = router