const mongoose  = require('mongoose');
const creds = require('../config/creds');

const db = creds.mongoURI;

dbConnect = async () => {
  try {
   await mongoose.connect(db,{ useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false });
   console.log('MongoDB connected');
 } catch (e) {
   console.error(e.message);
   process.exit(1)
 }
}


module.exports = dbConnect
