const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: String,
  lastName: String,
  firstName: String,
  emailAddress: String,
  officeId: String,
  officeName: String,
  sales: Number
});


module.exports = mongoose.model('Agent', agentSchema);
