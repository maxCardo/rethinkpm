const mongoose = require('mongoose');

const PropertyFilterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: String,
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
    blacklist: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('property_filter', PropertyFilterSchema);