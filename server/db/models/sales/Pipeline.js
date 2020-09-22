const mongoose = require('mongoose');

const pipelineSchema = new mongoose.Schema({
    active:{
        type: Boolean,
        default: true
    }, 
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyerPros'
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    deal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salesListings',
    },
    status: {
        type: String,
        required: true,
    },
    idxDealId: String, 
    history:[{
        event: String,
        statusTo: String,
        statusFrom: String, 
        date:{
            type: Date,
            default: Date.now()
        },
        note:String,
    }], 
    viewedOnSite: Boolean,
    viewedInApp: Boolean,
    liked: Boolean
});


module.exports = mongoose.model('Pipeline', pipelineSchema);