const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: String,
  lastName: String,
  firstName: String,
  fullName: String,
  emailAddress: String,
  email: [
    {
      address:String,
      isPrimary: Boolean,
    },
  ],
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
  },
  officeId: String,
  sales: Number,
  phone: String,
  phoneNumbers: [
    {
      number: {
        type: String,
      },
      phoneType: String,
      isPrimary: Boolean,
      okToText: Boolean,
    },
  ],
  status: String,
  notes: [
    {
      type: {
        type: String,
      },
      content: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  leadOwner: String,
  lastContact: Date,
  targetOffer: String,
  reasonForLoss: String,
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatAgent',
  },
});


module.exports = mongoose.model('Agent', agentSchema);
