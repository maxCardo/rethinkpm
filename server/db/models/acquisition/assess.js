const mongoose = require('mongoose');

const assessSchema = new mongoose.Schema({
  mlsNum:{
    type: String,
    required: true
  },
  inspectDate:,
  agent:,
  areaCondition:,
  exterior:{
    type:,
    condition:
  },
  roof:{
    condition:,
    type:,
  },
  hvac:,

  notes:[{
    note:{},
    date:{}
  }]


});

module.exports = Assess = mongoose.model('Assess', assessSchema);
