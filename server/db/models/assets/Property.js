const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    
    portfolio:{},
    address:{},
    AssetName: {
        type: String,
    },
    numOfUnits:{},
    fixtures:[{
        fixture:{},
        age:{},     
    }]
});


module.exports = Asset = mongoose.model('Asset', assetSchema);
