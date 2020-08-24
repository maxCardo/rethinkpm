const mongoose = require('mongoose');

const pipelineSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
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
    history:[{
        statusTo: String,
        statusFrom: String, 
        date:{
            type: Date,
            default: Date.now()
        },
        note:String,
    }],
    lastActive: Date, 
    viewedOnSite: Boolean,
    viewedInApp: Boolean
});


module.exports = mongoose.model('Pipeline', pipelineSchema);