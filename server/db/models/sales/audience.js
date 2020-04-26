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
  leads: [mongoose.Schema.Types.ObjectId]
});


module.exports = mongoose.model('audience', audienceSchema);
