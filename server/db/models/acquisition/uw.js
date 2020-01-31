//user appetite for underwiting assumptions
const uwSchema = new mongoose.Schema({
  user:{
    type: String,
    required: true
  },


});

module.exports = UW = mongoose.model('UW', uwSchema);
