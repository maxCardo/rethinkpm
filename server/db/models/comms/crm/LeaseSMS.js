//sms channel used when for lease CRM. 

const mongoose = require('mongoose');

const leaseTextSchema = new mongoose.Schema({
    openDate: {
        type: Date, 
        default: Date.now()
    },
    primeNum: {
        type: String,
        required: true
    },
    leaseLead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaseLead'
    },
    unread: {
        type: Boolean,
        required: true,
        default: true
    },
    msg: [
        {
            date: {type: Date, default: Date.now()}, 
            body: String,
            to: String, 
            from: String,
            sentBy: String 
        }
    ]
});

module.exports = mongoose.model('LeaseSMS', leaseTextSchema);