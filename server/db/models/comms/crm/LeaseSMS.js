//sms channel used when for lease CRM. 

const mongoose = require('mongoose');

const leaseTextSchema = new mongoose.Schema({
    openDate: {
        type: Date, 
        default: Date.now()
    },
    primeNum: {
        type: String,
        required: true,
        unique: true
    },
    //Note: depricating leaseLead field to allow for array when muliple leads are associated with a single number (1/2/26ap)
    leaseLead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaseLead'
    },
    leaseLeadArr:[
        {
            leaseLead: {
            
                type: mongoose.Schema.Types.ObjectId,
                ref: 'LeaseLead'
            }    
        }
    ],
    unread: {
        type: Boolean,
        required: true,
        default: true
    },
    lastMsgDate: { 
        type: Date, 
        default: Date.now() 
    },
    msg: [
        {
            date: {type: Date, default: Date.now()}, 
            body: String,
            to: String, 
            from: String,
            sentBy: String,
            staus: {
                type: String, 
                default: 'pending'
                //Statusus: pending, failed, queued, recived other twilio status?
            },
            //depricated and replaced with status
            isDelivered: {
                type: Boolean,
                default: false 
            },
            providerSid: {
                type: String, 
                index: true
            }
        }
    ]

});

module.exports = mongoose.model('LeaseSMS', leaseTextSchema);