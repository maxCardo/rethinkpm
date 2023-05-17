//version 0.1 shared with voodoo
const mongoose = require('mongoose');

const propertyRecordsSchema = new mongoose.Schema({
    data:{
      ownerName: {
        ran: {
            type: Boolean,
            default: false,
        },
        success: Boolean,
        errorRes: String,
        version: {
            //version 1
            type: Number,
            default: 1
        }
      },
      ownerRecord: {  //this is for versium phone scrape
        ran: {
          type: Boolean,
          default: false,
        },
        success: Boolean,
        errorRes: String,
        version: {
          //version 1
          type: Number,
          default: 1
        }
      },
    },
    parId: {
      type: String, 
      required: true, 
      unique: true
    },
    streetNumber: String, 
    streetName: String, 
    city: String, 
    state: String, 
    zipcode: String,
    municipality : Number,
    schoolDistrict: Number,
    owner : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'owner_records',
    },
    ownerName: String, //will need to scrape property to get this name
    ownerCode: Number,
    useCode: Number,
    lotArea: Number,
    homestead: Boolean,
    saleDate: Date,
    salePrice: Number, 
    totalRooms: Number, 
    bedrooms: Number,
    fullBath: Number,
    halfBath: Number,
    totalBath: Number,
    sqft: Number,
    //contact traced records will have a seperate schema tied to either owner or property. ? owner would be more effichant but may hit managment co who have reg address. 
    // for now we will focus on propety and owner records and contact trace the first few campaigns outside the system. 
    
    filters: [
      {
        field: String,
        subField: String,
        filterType: String,
        operator: String,
        value: mongoose.Schema.Types.Mixed,
        secondValue: mongoose.Schema.Types.Mixed
      }
    ],
    blacklist: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('property_records', propertyRecordsSchema);