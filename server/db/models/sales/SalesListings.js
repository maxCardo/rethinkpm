const mongoose = require('mongoose');

const salesListingsSchema = new mongoose.Schema({
    //use internaly to determain if data was aquired via API'd
    data: {
        county: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
            update12_6_20: {
                ran: {
                    type: Boolean,
                    default: false,
                },
                success: Boolean,
            },
        },
        idx: {
            ran: {
                type: Boolean,
                default: false,
            },
            add: String,
            success: Boolean,
            errorRes: String,
        },
        walkScore: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
        },
        census: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
        },
        rents: {
            HA: {
                ran: {
                    type: Boolean,
                    default: false,
                },
                success: Boolean,
                errorRes: String,
            },
            area: {
                ran: {
                    type: Boolean,
                    default: false,
                },
                success: Boolean,
                errorRes: String,
            },
            mls: {
                ran: {
                    type: Boolean,
                    default: false,
                },
                success: Boolean,
                errorRes: String,
            },
        },
        taxes: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
        },
        model: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
        },
        soldData: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
        },
        compReport: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
        }
    },
    propertyType: String, // determained by function: residental, smallMulti, multiFamily
    listDate: Date, //Function, must be day before created if list being created by yesterdays new listing. if record is created by today listings this can be set to default Date.now
    listNumber: {
        type: String,
        unique: true,
    }, // Webscarpe: MLS ID
    mlsStatus: String, // determained by function, may need to add additional status field to track in app functions
    //update rethink component naming convention when consolidating schema(next 2)
    images: Array,
    listingAgentID: String, // IDX API:   note: changed name from orignal scema, must update rethink component
    listingOfficeID: String, // IDX API:  note: changed name from orignal scema, must update rethink component
    listPrice: Number, // IDX API: origanal list price
    currentPrice: Number, //Function, set as list Price on create updated if price changes
    bedrooms: Number, // IDX API:
    bathsFull: Number, // IDX API:
    bathsPartial: Number, // IDX API:
    totalBaths: Number,
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
    municipality: String,
    taxMillage: {
        muni: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'taxes'
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'taxes'
        }
    },
    latitude: Number, //IDX API:
    longitude: Number, //IDX API:
    //convert long,lat to geoJson format, coordinates are stored in array [long,lat]
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: Array,

    },
    status: String, //Set By Function: app level status n    ???
    lotSize: Number, // County API:
    buildingSize: String, //not readily available on county api but is available on county site. scrape county front end? other option?  "FINISHEDLIVINGAREA" on county api?
    totalRooms: String, //county api "TOTALROOMS" used for cost estimations
    numUnits: Number, //get number of unit for multiFam deals
    zoning: String, //useCode available on County API but would need a map to see if this can be maped to zoneing , useDesc is another option
    ownerOcc: Boolean, //use "HOMESTEADFLAG" on county API. if future can use to find repeat owners
    ownerAddress: {
        //if not owner occ can grab this info off county API "CHANGENOTICEADDRESS..."
        address1: String,
        address2: String,
        city_state: String,
        zip: String,
    },
    lotBlock: String, //County API: "PARID"
    hvac: {
        code: String, //county api HEATINGCOOLING
        desc: String // conty api HEATINGCOOLINGDESC
    },
    tract: String, //Census API
    opZone: Boolean, // In-house API or save data in app
    walkScore: Number, //from walkScore API
    lastSold: {
        //from county API
        date: String,
        price: Number,
    },
    rents: {
        //in-house rent API or save data in app
        HA: {
            tier: String,
            rent: Number,
        },
        market: Number,
        area: Number,
        multiFam: Number,
    },
    soldPrice: Number, //County API: is not updated right away will have to gather at some point after the sale. will need further reserch to determain best stratigy for this.
    //manualy entrey via UI (online review)
    saleDate: Date,
    sellingAgentID: String, // manualy updated bi yearly for agent recruiment via csv from MLS site
    sellingOfficeID: String, // manualy updated bi yearly for agent recruiment via csv from MLS site
    style: String, // define styles , mls manualy csv do give styles but limited in scope?? how to use. can we get this of county data?
    condition: String, //A define condition A,B,C,D
    history: [
        {
            type: {
                //priceChange, statusUpdate, note, log etc
                type: String,
            },
            statusChange: {
                to: String,
                from: String,
            },
            priceChange: {
                to: String,
                from: String,
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
    //manualy updated bi yearly for agent recruiment via csv from MLS site  DEPRICATED: not sure if ever used
    buyerAgentId: String,
    buyerOfficeId: String,
    unitSch: [
        {
            unitType: String,
            bedrooms: Number,
            bathsFull: Number,
            bathsPartial: Number,
            totalBaths: Number,
            size: Number, //sqft
            rent: Number,
            subRent: Number,
            areaRent: Number,
            numUnits: Number,
        },
    ],
    grm: Number,
    cap: Number,
    highCap: Number,
    model: {
        rentalIncome: Number,
        vacancyLoss: Number,
        taxes: {
            low: Number,
            high: Number,
        },
        insurance: Number,
        maintenance: Number,
        leasing: Number,
        management: Number,
        utilities: Number,
    },
    assessedValue: {
        bldg: Number,
        land: Number,
    },
    compReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comp_report'
    },
});

salesListingsSchema.index({ location: '2dsphere' })


module.exports = mongoose.model('salesListings', salesListingsSchema);
