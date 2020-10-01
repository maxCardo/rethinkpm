const mongoose = require('mongoose');

const navigationRouteSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String
  }
});


module.exports = mongoose.model('NavigationRoute', navigationRouteSchema);
