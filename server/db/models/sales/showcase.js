const mongoose = require('mongoose');
const { string } = require('prop-types');

const showcaseSchema = new mongoose.Schema({
    listName: {
        type: String, 
        default: 'FGMH'
    },
    deal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salesListings',
    },
    status: {
        type: String,
        required: true,
    },
    model_link: String, 
    history: [
        {
            type: {
                //priceChange, statusUpdate, note, log etc
                type: String,
            },
            statusChange: {
                to: String,
                from: String,
            },
            priceChange: {
                to: String,
                from: String,
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
    viewedOnSite: Boolean,
    viewedInApp: Boolean,
    liked: Boolean
});


module.exports = mongoose.model('Showcase', showcaseSchema);