const express = require('express');
const auth = require('../../../middleware/auth');

const ListLeads = require('../../../db/models/sales/ListLeads')
const LeadCompReport = require('../../../db/models/sales/LeadCompReport')
const SellerPros = require('../../../db/models/prospects/SellerPros')


const router = express.Router();

// @route: Get api/marketplace/off_market/seller_pipeline/:id
// @desc: get pipeline deals for a buyerPros
// @ access: private
router.get('/seller_pipeline/:id', async (req, res) => {
    try {
        let sellerId = req.params.id;
        let pipeline = await ListLeads.find({ "pros": sellerId })
            .populate({ path: 'compReport', populate: { path: 'comps.listing_id' } })
            .populate({path: 'history',populate:'user'})
        res.status(200).send(pipeline)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

// @route: Get api/marketplace/off_market/seller_pipeline/:id
// @desc: get pipeline deals for a buyerPros
// @ access: private
router.delete('/seller_pipeline/:id', async (req, res) => {
    const id = req.params.id;
    console.log('running api call del seller rec')
    try {
        const lead = await ListLeads.findById(id)
        const seller = await SellerPros.findById(lead.pros)
        //delete record in sellerPros Array
        console.log(seller.listLeads.length)
        const updateList = seller.listLeads.filter(lead => lead != id)
        seller.listLeads = updateList
        console.log(seller.listLeads.length)
        seller.save()
        //find compReport and delete
        if (lead.compReport) {
            await LeadCompReport.findByIdAndDelete(lead.compReport)
        }
        await lead.remove()
        res.status(200).json({msg:'Record Deleted'})
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
})

const deleteListLead = async (id) => {
    const lead = await ListLeads.findById(id)
    const seller = await SellerPros.findById(lead.pros)
    //delete record in sellerPros Array
    seller.listLeads.forEach((list, i) => {
        if (list === id) { seller.listLeads.splice(i, 1) }
    })
    seller.save()
    //find compReport and delete
    if (lead.compReport) {
        await LeadCompReport.findByIdAndDelete(lead.compReport)
    }
}



module.exports = router;