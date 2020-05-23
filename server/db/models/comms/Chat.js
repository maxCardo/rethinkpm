const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    ownerType: String,
    title: String,
    subTitle: String, 
    botOn: {
        type: Boolean,
        default: true
    },
    unread: {
        type: Boolean,
        default: true
    },
    from: String, 
    to: String,
    
    messages: [{
        date: {
            type: Date,
            default: Date.now
        },
        sender: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        userMessage: {
            type: Boolean,
            required: true
        }
    }],

});


module.exports = Chat = mongoose.model('Chats', chatSchema);
