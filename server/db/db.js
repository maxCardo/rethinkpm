const mongoose  = require('mongoose');
var cachegoose = require('cachegoose');
const creds = require('../config/creds');

const db = creds.mongoURI;

cachegoose(mongoose)

dbConnect = async () => {
  try {
   await mongoose.connect(db,{ useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false, useUnifiedTopology: true });
   console.log('MongoDB connected');
 } catch (e) {
   console.error(e.message);
   process.exit(1)
 }
}


module.exports = dbConnect
