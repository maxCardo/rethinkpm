const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
  officeId: String,
  name: String
});


module.exports = mongoose.model('Office', officeSchema);