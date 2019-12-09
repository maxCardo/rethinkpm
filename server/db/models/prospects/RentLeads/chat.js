const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  inq:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'RentLeadInq'
  },
    botOn: {
        type: Boolean,
        default: true
    },
    unread: {
        type: Boolean,
        default: true
    },
    messages: [{
        message: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        from:{
            type: String,
        }
        
    }],

});


module.exports = ChatInq = mongoose.model('ChatInq', chatSchema);
