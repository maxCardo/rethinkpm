const mongoose = require('mongoose');

const salesListingsSchema = new mongoose.Schema({
    //use internaly to determain if data was aquired via API'd
    data:{
        county: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String
        },
        idx: {
            ran: {
                type: Boolean,
                default: false,
            },
            add:String,
            success: Boolean,
            errorRes: String
        },
        walkScore: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String
        },
    },
    propertyType: String, // determained by function: residental, smallMulti, multiFamily
    listDate: Date, //Function, must be day before created if list being created by yesterdays new listing. if record is created by today listings this can be set to default Date.now
    listNumber: {
        type: String,
        unique: true
    }, // Webscarpe: MLS ID
    mlsStatus: String, // determained by function, may need to add additional status field to track in app functions
    //update rethink component naming convention when consolidating schema(next 2)
    listingAgentID: String, // IDX API:   note: changed name from orignal scema, must update rethink component
    listingOfficeID: String, // IDX API:  note: changed name from orignal scema, must update rethink component
    listPrice: Number, // IDX API: origanal list price
    currentPrice: Number, //Function, set as list Price on create updated if price changes
    bedrooms: Number, // IDX API:
    bathsFull: Number, // IDX API:
    bathsPartial: Number, // IDX API:
    //update rethink comp
    address: String, //refactored refactored on front end to combine the streetNumber and  streetName
    streetNumber: String, // IDX API: 
    streetName: String, // IDX API:
    city: String, // IDX API:
    state: String, // IDX API:
    zipcode: String, // IDX API:
    county: String, // IDX API:
    area: String, //not available via idx api. can build map to determain based on address or cordinates or scrape off new listing url.
    schoolDistrict: String, //not available via api of scrape. need to find data source, available on county data api
    latitude: Number, //IDX API:
    longitude: Number, //IDX API:
    status: String, //Set By Function: app level status n    
    lotsize: Number, // County API: 
    buildingSize: Number, //not readily available on county api but is available on county site. scrape county front end? other option?
    zoning: String, //useCode available on County API but would need a map to see if this can be maped to zoneing , useDesc is another option
    lotBlock: String, //County API:
    tract: String, //Census API 
    opZone: Boolean, // In-house API
    walkScore: Number, //from walkScore API
    lastSold:{ //from county API
        date: Date,
        price: Number
    },
    projectedRent: { //in-house rent API
        HA: Number,
        market: Number,
        multiFam: Number
    },
    //selling data
    contingentDate: Date, //Function: trigger date when status is changed to contingent of undercontract if status is not already contingent, delete date if status is changed to active
    closingDate: Date, //Function: trigger date when status is changed to sold 
    soldPrice: Number, //County API: is not updated right away will have to gather at some point after the sale. will need further reserch to determain best stratigy for this.
    //manualy entrey via UI (online review)
    style: String, // define styles , mls manualy csv do give styles but limited in scope
    condition: String, //A define condition A,B,C,D
    lisintgNotes: [
        {
            type: { //priceChange, condition, zoning etc
                type: String,
            },
            content: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    //physical inspections: ui entrey for physical inspection of property by our staff
    agentInspection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    },
    
    //Showings: data on showings by inside agents, // need to create schema in future
    showings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'showing',
        },
    ],

    //financial calcultions by user
    UW: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'showing',
        },
    ],

    //manualy updated bi yearly for agent recruiment via csv from MLS site
    buyerAgentId: String, 
    buyerOfficeId: String,

       
    
});


module.exports = mongoose.model('salesListings', salesListingsSchema);