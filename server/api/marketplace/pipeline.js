const express = require('express');
const auth = require('../../middleware/auth');
const SalesListings = require('../../db/models/sales/SalesListings');
const BuyerPros = require('../../db/models/prospects/BuyerPros');
const Pipeline = require('../../db/models/sales/Pipeline');


const router = express.Router();

router.use(auth);


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

//ToDo: I will refactor this in the future. 
// @route: GET /api/marketplace/pipeline/sync;
// @desc: Sync and update buyer pipeline deals with website
// @ access: Public * ToDo: update to make private
router.post("/sync", async (req, res) => {
    try {
        let buyerId = req.body._id;
        let buyerIdxId = req.body.idxId;
        let currentBuyerListings = [];
        /*TODO: CHANGE BACK TO DYNAMIC idxId after completion*/
        let idxBuyerListings = await getIdxSavedListings(39);

        for (let i = 0; i < idxBuyerListings.data.length; i++) {

            const propertyId = idxBuyerListings.data[i].property.listingID;
            let currentProperty = await SalesListings.find({listNumber: propertyId});
            let shet = await currentProperty.map((value, index) => {
                return {
                    deal: value._id,
                    address: value.address,
                    city: value.area,
                    state: 'Pensilvania',
                    zip: value.zipcode,
                    listingId: value.listNumber
                }
            });

            currentBuyerListings.push(shet[0]);
        }

        let buyer = await model.findById(buyerId);
        await buyer.set({
            ...buyer,
            inqListings: currentBuyerListings
        });
        var result = await buyer.save();
        console.log(currentBuyerListings);
        let pipeline = await Pipeline.find({"buyer": buyerId});
        // //TODO: create the new pipeline object
        // pipeline.set({
        //     active: true,
        //     _id: 5f52910241efce07e4484fc8,
        //     buyer: 5f4e4934f8e1720650a531c5,
        //     agent: 5d4abac5d345d233a8ddb80f,
        //     deal: 5f1089e337328534946f090c,
        //     status: 'recommend',
        //     history: [ [Object] ],
        //     __v: 0
        // })
        console.log(pipeline);

        res.status(200).send(result);

    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});


module.exports = router;
