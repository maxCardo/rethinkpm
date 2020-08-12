const mongoose = require('mongoose')

const rentInqSchema = new mongoose.Schema({

    prospect: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'rentPros'
    },
    notes: [
        {
            type: {
                type: String,
            },
            content: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    status: {
        type: String,
        default: 'prospect'
    },
    reasonForLoss: String,
    leadOwner: String,
    leadSource:String,  
    createDate: {
        type: Date,
        default: new Date()
    },
    lastContact: Date,
    campaign: {
        type: String
    },

})

module.exports = RentInq = mongoose.model('rentInq', rentInqSchema)