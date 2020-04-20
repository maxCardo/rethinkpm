const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: String,
  lastName: String,
  firstName: String,
  fullName: String,
  emailAddress: String,
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office'
  },
  officeId: String,
  sales: Number,
  phone: String,
  status: String,
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }],
  leadOwner: String,
  lastContact: Date,
  targetOffer: String,
  reasonForLoss: String,
});


module.exports = mongoose.model('Agent', agentSchema);
