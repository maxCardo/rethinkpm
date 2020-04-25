const mongoose = require('mongoose');

const filtersSchema = new mongoose.Schema({
  name: String,
  filters: [
    {
      field: String,
      filterType: String,
      value: mongoose.Schema.Types.Mixed
    }
  ]
});


module.exports = mongoose.model('filters', filtersSchema);
