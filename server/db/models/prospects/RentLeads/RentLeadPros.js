const mongoose = require('mongoose');

const rentLeadProsSchema = new mongoose.Schema({
    createDate: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        sparse:true
    },
    phone: {
        phoneNumber: {
            type: Number,
            unique: true,
            sparse:true
        },
        phoneType: {
            type: String
        },
    },

    notes: [{
        note: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],

    inquiries: [{
        inquary: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RentLeadInq'
        }
    }],
    Chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatInq'
    },


});

module.exports = RentLeadPros = mongoose.model('RentLeadPros', rentLeadProsSchema);
