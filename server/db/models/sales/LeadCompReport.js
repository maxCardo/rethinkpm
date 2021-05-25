const mongoose = require('mongoose');

const leadCompReportSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'list_leads',
        unique: true
    },
    updated: {
        type: Boolean,
        default: false
    },
    review:{
        avail: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        features: Object, 
        adjustments: Object 
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
        totalAdj: Number,
        //added
        blackList: Boolean,
        like: Boolean,
        addAdj: Object,
        ttlAddAdj: Number,
        addAdjPrice: Number 
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
    },
    adjPrice:{
        average: Number,
        Median: Number,
        priceRange: String,
        _25_75: String,
        _10_90: String,
        stdDev: String,
        sampleSize: Number,
        searchRad: String,
        arv: Number,
    },
    history: [
        {
            type: {
                //note, log etc
                type: String,
            },
            content: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
})

module.exports = mongoose.model('lead_comp_report', leadCompReportSchema);

//migrated from BM on 4-7-21
//updated here on 5/10/21