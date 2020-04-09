const mongoose = require('mongoose');

const singleFamilySalesSchema = new mongoose.Schema({
  distance: String,
  zipcode: String,
  county: String,
  area: String,
  listNumber: String,
  status: String,
  listPrice: Number,
  yearBuilt: Number,
  address: String,
  agentId: String,
  bedrooms: Number,
  bathsFull: Number,
  bathsPartial: Number,
  style: String,
  contact: String,
  contactPhone: String,
  office: String,
  closingDate: Date,
  soldPrice: Number,
  sellingAgentId: String,
  sellingOfficeId: String,
});


module.exports = mongoose.model('singleFamilySales', singleFamilySalesSchema);
