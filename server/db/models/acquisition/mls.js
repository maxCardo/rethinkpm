//targeted mls listings
const mlsSchema = new mongoose.Schema({
  zip:{
    type: String,
    required: true
  },
  county:,
  areaName:,
  listNum:,
  status:,
  listPrice:,
  yearBuilt:,
  address:,
  agentID:,
  beds:,
  fBath:,
  pBath:,
  style:,
  contact:{
    contactName:,
    number:,
    office:,
  },
  closingDate:,
  soldPrice:,

});

module.exports = MLS = mongoose.model('MLS', mlsSchema);
