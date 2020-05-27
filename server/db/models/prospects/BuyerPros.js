const mongoose = require('mongoose')

const buyerProsSchema = new mongoose.Schema({
    
    firstName: String, 
    lastName: String,
    fullName: String,
    email:[
        {
            address: String, 
            isPrimary: Boolean
        }
    ],
    phoneNumbers:[
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
        default: 'prospect'
    }, 
    reasonForLoss: String,
    leadOwner: String, 
    createData: {
        type: Date,
        default: new Date()
    },
    lastContact: Date,
    inqListings:[
        {
            listing: String,
            Date: {type: Date, default: new Date()}
        }
    ]
})

module.exports = mongoose.model('buyerPros', buyerProsSchema)