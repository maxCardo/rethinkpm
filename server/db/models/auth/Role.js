const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }]
});


module.exports = mongoose.model('Role', roleSchema);
