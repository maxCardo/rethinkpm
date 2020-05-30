const mongoose = require('mongoose');

const filtersSchema = new mongoose.Schema({
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
  profileType: String,
});


module.exports = mongoose.model('filters', filtersSchema);
