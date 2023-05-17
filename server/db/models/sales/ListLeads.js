const mongoose = require('mongoose');

const listLeadSchema = new mongoose.Schema({
    //use internaly to determain if data was aquired via API'd
    data: {
        county: {
            ran: {
                type: Boolean,
                default: false,
            },
            success: Boolean,
            errorRes: String,
            version: {
                //see version notes below
                type: Number,
            }
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
    propertyType: String, // res | multi, user form input
    createDate: {
        type: Date,
        default: Date.now
    }, // create date 
    status: String, // new | active | passive | dead dead = leave me alone, sold to someone else. passive = dormont no answer, both are considers not active
    pros: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerPros'
    },
    prosType: String, //homeOwner or wholesaler, directBuy. Can add other prosType as they come up in future, - depricate: redundanant with info on sellerPros
    source: {  //marketing channel. redundent with pros rec?
        type: String,
        default: 'unknown'
    },
    images: Array, //link to google drive for pics
    _360: String, //link to 360 tour if available
    targetPrice: Number, // quoted target price by owner or wholsaler 
    bedrooms: Number, // based on user form input
    bathsFull: Number,
    bathsPartial: Number,
    totalBaths: Number,
    streetNumber: String,
    streetName: String,
    city: String,
    state: String,
    zipcode: String,
    county: String,
    area: String, //google varify data includes this but may not match with known boundries. This will need to be reserched later   ????
    schoolDistrict: String, //county data: only available for alleghny county 
    municipality: String,
    taxMillage: { //internaal data based on municpality and school district. Only available in allegheny county
        muni: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'taxes'
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'taxes'
        }
    },
    location: { //pulled from mapquest API 
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: Array,
    },
    lotSize: Number, // County API:
    buildingSize: String,
    totalRooms: String,
    numUnits: Number, //userform input on multifamily deals
    zoning: String,
    ownerOcc: Boolean,
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
        date2: String,
        Price2: String,
        date3: String,
        price3: String,
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
    style: String, // define styles , mls manualy csv do give styles but limited in scope?? how to use. can we get this of county data?
    condition: String, //A define condition A,B,C,D
    history: [
        {
            type: {
                //priceChange, statusUpdate, note, log etc
                type: String,
            },
            to: String,
            from: String,
            content: String,
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
        ref: 'lead_comp_report'
    },
    assesment: {
        app: {

        }
    }
});

listLeadSchema.index({ location: '2dsphere' })


module.exports = mongoose.model('list_leads', listLeadSchema);


//version
// County:
  //Verison 1 . 

//added from Bm on 4-6-21