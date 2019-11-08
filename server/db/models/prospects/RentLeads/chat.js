const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  prospect:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'RentLeadPros'
  },
  chat: {
      botOn: {
          type: Boolean,
          default: true
      },
      messages: [{
          from: {
              type: String
          },
          message: {
              type: String,
          },
          date: {
              type: Date,
              default: Date.now
          },
          unread: {
              type: Boolean,
              default: true
          }
      }],
  },

});


module.exports = ChatInq = mongoose.model('ChatInq', chatSchema);
