const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  navigationRoutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavigationRoute' 
  }]
});


module.exports = mongoose.model('Permission', permissionSchema);
