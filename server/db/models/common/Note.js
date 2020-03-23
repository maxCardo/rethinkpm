const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  },
  content: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = Note = mongoose.model('Note', noteSchema);
