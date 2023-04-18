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
        type: String, //active, rejected , lost , purchased
        required: true,
    },
    model_link: String, 
    history: [
        {
            type: {
                //note = info, log = automated from system 
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
    viewedOnSite: Boolean,
    viewedInApp: Boolean,
    liked: Boolean
});


module.exports = mongoose.model('Showcase', showcaseSchema);