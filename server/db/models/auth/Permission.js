const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String
  }
});


module.exports = mongoose.model('Permission', permissionSchema);
