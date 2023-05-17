const mongoose = require('mongoose');

const areaRents = new mongoose.Schema({
    data: {
        scrape: {
            type: Boolean,
            defult: false
        },
        success: {
            type: Boolean,
        }
    },
    searchName: String, //can be zip, area or custom name
    marketPrice: {
        _1BD: {
            avg: String,
            avg_range: String,
            med: String,
            percentile_10: String,
            percentile_25: String,
            percentile_75: String,
            percentile_90: String,
            std_dev: String,
            samples: String,
            radius: String,
        },
        _2BD: {
            avg: String,
            avg_range: String,
            med: String,
            percentile_10: String,
            percentile_25: String,
            percentile_75: String,
            percentile_90: String,
            std_dev: String,
            samples: String,
            radius: String,
        },
        _3BD: {
            avg: String,
            avg_range: String,
            med: String,
            percentile_10: String,
            percentile_25: String,
            percentile_75: String,
            percentile_90: String,
            std_dev: String,
            samples: String,
            radius: String,
        },
        _4BD: {
            avg: String,
            avg_range: String,
            med: String,
            percentile_10: String,
            percentile_25: String,
            percentile_75: String,
            percentile_90: String,
            std_dev: String,
            samples: String,
            radius: String,

        },
    },

    //to use with tracking future rate price. 
    marketChange: {
        _1BD: [{
            date: Date,
            medPrice: String
        }],

        _2BD: [{
            date: Date,
            medPrice: String
        }],

        _3BD: [{
            date: Date,
            medPrice: String
        }],

        _4BD: [{
            date: Date,
            medPrice: String
        }]
    }

})

module.exports = mongoose.model('AreaRents', areaRents);