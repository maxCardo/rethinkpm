const mongoose = require('mongoose');

const multiSalesSchema = new mongoose.Schema({
  zipcode: String,
  county: String,
  area: String,
  listNumber: String,
  status: String,
  listPrice: Number,
  address: String,
  agentId: String,
  propertyType: String,
  numberOfUnits: String,
  contact: String,
  contactPhone: String,
  office: String,
  closingDate: Date,
  soldPrice: Number,
});


module.exports = mongoose.model('multiSales', multiSalesSchema);
