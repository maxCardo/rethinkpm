const mongoose = require('mongoose');

const agentChatSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Agent'
    },
    botOn: {
        type: Boolean,
        default: false
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
        from: {
            type: String,
        }

    }],

});


module.exports = ChatInq = mongoose.model('ChatAgent', agentChatSchema);
