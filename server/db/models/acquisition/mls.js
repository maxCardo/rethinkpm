//targeted mls listings
const mlsSchema = new mongoose.Schema({
  property:{
    type: String,
    required: true
  },


});

module.exports = MLS = mongoose.model('MLS', mlsSchema);
