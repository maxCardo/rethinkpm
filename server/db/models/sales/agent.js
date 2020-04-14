const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: String,
  lastName: String,
  firstName: String,
  emailAddress: String,
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office'
  },
  officeId: String,
  sales: Number,
  phone: String,
  status: String
});


module.exports = mongoose.model('Agent', agentSchema);
