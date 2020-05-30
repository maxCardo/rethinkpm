const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
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
  audience: [mongoose.Schema.Types.ObjectId],
  profileType: String,
});


module.exports = mongoose.model('audience', audienceSchema);
