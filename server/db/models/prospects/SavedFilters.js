const mongoose = require('mongoose');

const savedFilterSchema = new mongoose.Schema({
    name: String,
    user: mongoose.Schema.Types.ObjectId,
    profileType: String, //agentPros, RentLead.. etc
    filterType: String, //audiance or filter
    filters: [
        {
            field: String,
            filterType: String,
            value: mongoose.Schema.Types.Mixed
        }
    ],
    audiance: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('SavedFilter', savedFilterSchema);