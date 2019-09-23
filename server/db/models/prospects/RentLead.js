const mongoose = require('mongoose');

//ToDo: refactor into two schemas rentLeads and inquaries
const rentLeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true
    },
    phoneType:{
        type: String
    },
    
    createDate: {
        type: Date,
        default: Date.now
    },
    // Todo: should be subcatigory of inquary since one shopper should be able to look at multible listing. Also can use status for other events like app
    status: {
        currentStatus:{
            type: String,
            required: true,
            default: 'active'
        },
        deadWhy:{
            type:String
        },
        lastActive:{
            type: Date,
            default: Date.now
        }

    },
    notes: [{
        note: {
            type: String,
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    listingInq: [
        {
            property: {
                type: String,
            },
            dateInq: {
                type: Date,
                default: Date.now
            } 
        }
    ],

    chat:{
        botOn:{
            type: Boolean,
            default: true
        },
        messages:[{        
            from:{
                type: String
            },
            message: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            },
            unread: {
                type: Boolean,
                default: true
            }
        }],
    },
    //refactor below in more consolidated structure
    schDate:{
        type: String
    },
    
    tourDate: {
        type: Date
    },
    tourRes:{
        type: String
    },
    intrLvl:{
        type: String
    },

    application:{
        appStatus:{
            type: String
        },
        holdFee:{
            type: Boolean
        }
    }
    
});




module.exports = RentLead = mongoose.model('RentLead', rentLeadSchema);
