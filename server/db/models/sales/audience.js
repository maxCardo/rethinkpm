const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
  name: String,
  filters: [
    {
      field: String,
      filterType: String,
      value: mongoose.Schema.Types.Mixed
    }
  ],
  audience: [mongoose.Schema.Types.ObjectId],
  profileType: String,
});


module.exports = mongoose.model('audience', audienceSchema);
