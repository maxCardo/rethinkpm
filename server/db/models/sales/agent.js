const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: String,
  lastName: String,
  firstName: String,
  fullName: {
    type: String, 
    default: 'unknown'
  },
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
  status:{
    type:String,
    default: 'prospect'
  }, 
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
  zipCodes:{
    name: String,
    value: Number
  },
    areas: {
    name: String,
    value: Number
  }
});


module.exports = mongoose.model('Agent', agentSchema);
