const mongoose = require('mongoose');

const assessSchema = new mongoose.Schema({
  property:{
    type: String,
    required: true
  },


});

module.exports = Assess = mongoose.model('Assess', assessSchema);
