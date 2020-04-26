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
  phoneNumbers: [{
    number: {
      type: String
    },
    phoneType: String,
    isPrimary: Boolean,
    okToText: Boolean
  }],
  status: String,
  notes: [{
    note: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  leadOwner: String,
  lastContact: Date,
  targetOffer: String,
  reasonForLoss: String,
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatAgent'
  },
});


module.exports = mongoose.model('Agent', agentSchema);
