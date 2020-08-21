const mongoose = require('mongoose');

const marketFilterSchema = new mongoose.Schema({
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

module.exports = mongoose.model('MarketFilter', marketFilterSchema);