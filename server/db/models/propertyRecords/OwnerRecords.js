const mongoose = require('mongoose');

const ownerRecordsSchema = new mongoose.Schema({
    name: String,
    regAddress: {  //key item match with record on county data, quastion around changeNoticeAddress2 field and records with no address
        type: String,
        required: true, 
        unique: true
    },
    address1: String,
    address2: String,
    address3: String,
    address4: String,
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner_records',
      }], 
    numberOfProperties: Number, 
});

module.exports = mongoose.model('owner_records', ownerRecordsSchema);