const express = require('express')
const auth = require('../../middleware/auth')
const {sendEmail} = require('../../3ps/email')
const SalesListings = require('../../db/models/sales/SalesListings')
const BuyerPros = require('../../db/models/prospects/BuyerPros')
const Pipeline = require('../../db/models/sales/Pipeline')

const router = express.Router()

router.use(auth)

// @route: post /api/marketPlace/ops
// @desc: 
// @ access: Public 
router.post('/recommend',auth, async (req, res) => {
    console.log('running api call');
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
                        event:'recommend',
                        statusTo: 'recommend',

                    }
                ]
            })
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            //switch to pipeline id from buyer id  
            const html = `
                <p>${customMessage}</p>
                <a href='http://cardo.idxbroker.com/idx/details/listing/d504/${propertyId}?bid=${deal._id}&mode=recommend'>Property</a>
            `
            sendEmail(buyerEmail.address, subject, customMessage, html)
        })
        res.json({ ok: true })
    } catch (err) {
        console.error(err);
        res.status(500).send('server error')
    }
})

module.exports = router