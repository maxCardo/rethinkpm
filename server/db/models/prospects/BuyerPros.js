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
    targetArea: [{
            name:String
        }],
    targetZip: [{
        name:String
    }],
    priceRange: Array,
    preApproved:{
        status:Boolean,
        docType: String, //pre Approval or prrof of funds
        amount:Number
    },
    otherPref:Array,
    status: {
        type: String,
        default: 'new'
    }, 
    reasonForLoss: String,
    leadOwner: String,
    leadSource:String, 
    createData: {
        type: Date,
        default: new Date()
    },
    lastContact: Date,
    buyerType: String,
    inqListings:[
        {
            address: String,
            city: String,
            state: String,
            zip: String,
            listingId: String,
            Date: {type: Date, default: new Date()}
        }
    ]
})

module.exports = mongoose.model('buyerPros', buyerProsSchema)