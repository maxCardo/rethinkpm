const mongoose = require('mongoose')

const sellerProsSchema = new mongoose.Schema({

    user: {
        type: String,
        unique: true
    },
    userType: String, //listLead, wholesaler ,directBuyLead  
    firstName: String,
    lastName: String,
    fullName: String,
    email: [
        {
            address: String,
            isPrimary: Boolean
        }
    ],
    phoneNumbers: [
        {
            number: String,
            isPrimary: Boolean,
            okToText: Boolean
        }
    ],
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
                ref: 'User',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    status: {
        type: String,
        default: 'new'
    },
    reasonForLoss: String,
    leadOwner: String,
    leadSource: String,
    createData: {
        type: Date,
        default: new Date()
    },
    lastContact: Date,
    sellerType: String,
    listLeads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'list_leads',
        }
    ],
    activeListings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'salesListings',
        }
    ]

})

module.exports = mongoose.model('sellerPros', sellerProsSchema)

//updated from BM on 4-5-2021