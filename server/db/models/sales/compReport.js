const mongoose = require('mongoose');

const compReportSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salesListings',
        unique: true
    },
    comps: [{
        listing_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'salesListings'
        },
        listNumber: String, //redundent
        size: Number, //in bedrooms redundent
        distance: Number,
        age: Number,
        area: String,
        salePrice: Number, //redundent
        adjSalePrice: Number,
        adjustments: Object,
        totalAdj: Number
    }],
    price: {
        average: Number,
        Median: Number,
        priceRange: String,
        _25_75: String,
        _10_90: String,
        stdDev: String,
        sampleSize: Number,
        searchRad: String,
        arv: Number,
        oov: Number
    }
})

module.exports = mongoose.model('comp_report', compReportSchema);