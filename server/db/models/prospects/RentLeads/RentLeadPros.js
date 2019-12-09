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

});


//not working ????
rentLeadProsSchema.virtual('Chats',{
    ref: 'ChatInq',
    localField: '_id',
    foreignField: 'prospect'
})

module.exports = RentLeadPros = mongoose.model('RentLeadPros', rentLeadProsSchema);
