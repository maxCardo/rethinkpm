const mongoose = require('mongoose');

const savedFilterSchema = new mongoose.Schema({
    name: String,
    user: mongoose.Schema.Types.ObjectId,
    profileType: String, //agentPros, RentLead.. etc
    filterType: String, //audiance or filter
    filters: [
        {
            field: String,
            subField: String,
            filterType: String,
            operator: String,
            value: mongoose.Schema.Types.Mixed,
            secondValue: mongoose.Schema.Types.Mixed
        }
    ],
    audience: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('SavedFilter', savedFilterSchema);