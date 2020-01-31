//tracked changes to mls listing. Not sure how we will use this in the future
// can be used to both find opertunities with falling prices as well as high level analysis of micro markets.
const mongoose = require('mongoose');

const hotSheetSchema = new mongoose.Schema({
  mlsNum:{},
  changeType:{
    type: String,
    required: true
  },
  changeInfo:{},



});

module.exports = Assess = mongoose.model('Assess', assessSchema);
