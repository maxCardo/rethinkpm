const express = require('express')
const { postSlack } = require('../../3ps/slack')
const { addIdxUser } = require('../../3ps/idx')
const Buyer = require('../../db/models/prospects/BuyerPros')
const Pipeline = require('../../db/models/sales/Pipeline')
const {addIdxListing} = require('../../3ps/idx')
const {postSlack} = require('../../3ps/slack')


const router = express.Router()


//---------------------------------------------------------------- Website Endpoints -------------------------------------------------------------------------------------//


// @route: post /api/marketPlace/website/newuser;
// @desc: create new user from website
// @ access: Public 
router.post('/newuser', async (req, res) => {
    try {
        console.log('new account:', req.body);
        await new Buyer(req.body)
        res.status(200).send('success new idx user')
    } catch (err) {
        res.status(400).send(err)
        console.error(err);
        //postSlack({text: `failed to create new user record for ${req.body.email} from website call`})
    }
})

// @route: post /api/marketPlace/website/deal/view;
// @desc: record view on suggested deal
// @ access: Public 
router.post('/deal/view', async (req, res) => {
    try {
        const {bid} = req.body
        const deal = await Pipeline.findById(bid)
        deal.viewedOnSite = true
        deal.history.push({
            event:'viewd',
            note:'buyer viewd property on website'
        })
        await deal.save()
        res.status(200).send('success view')
    } catch (err) {
        res.status(400).send('server error')
        console.error(err);
        //postSlack({ text: `failed to record website view for ${req.body.bid} from website` })
    }
})

// @route: post /api/marketPlace/website/deal/like;
// @desc: record like or unlike on suggested deal
// @ access: Public 
router.post('/deal/like', async (req, res) => {
    try {
        //find pipeline deal
        const { bid, liked} = req.body
        const deal = await Pipeline.findById(bid).populate('buyer')
        //if like === true
        if (liked === true){
            console.log('liked the deal');
            //update status to like
            deal.liked = true 
            deal.history.push({
                event: 'liked',
                statusTo: 'liked',
                statusFrom: deal.status,
                note: 'buyer liked property on website'
            })
            deal.status = 'liked'
            //update idx to like
            console.log(deal.buyer);
            addIdxListing(deal.buyer.idxId, deal.deal)
        } else if (liked === false) {
            console.log('did not like');
            deal.liked = false
            deal.history.push({
                event: 'rejected recommend',
                statusTo: 'dead',
                statusFrom: deal.status,
                note: 'buyer did not like deal on property on website'
            })
            deal.status = 'dead'
            deal.active = false     
        }
        console.log('ran deal liked')
        res.status(200).send('success like')
    } catch (err) {
        res.status(400).send('server error')
        console.error(err);
        //postSlack({ text: `failed to record website like/unlike for ${req.body.bid}: ${req.body.liked} from website` })
    }
})


module.exports = router