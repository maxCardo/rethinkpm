const rentLeadInqSchema = new mongoose.Schema({
    
    prospect:{
        type: String
    },

    DateInq:{
        type: Date
    },

    listing:{
        type: String
    },

    status: {
        // current status new, engaged, scheduled, toured, application, dead
        currentStatus: {
            type: String,
            required: true,
            default: 'active'
        },

        //status new
        new: {
            contactMethod: {
                type: String
            },
            numFlwUps: {
                type: Number
            },

        },

        //status engaged:
        engaged:{
            lastActive: {
                type: Date,
                default: Date.now
            },
            nextFlwUp:{
                type: Date
            }
        },


        //status appointment set
        scheduled: {
            schDate: {
                type: String
            },
        },

        // status toured
        toured: {
            touredDate: {
                type: Date
            },
            tourRes: {
                type: String
            },
            intrLvl: {
                type: String
            },
        },

        //status application
        application: {
            appDate: {
                type: Date
            },
            appStatus: {
                type: String
            },
            holdFee: {
                type: Boolean
            }
        },

        //Status Dead
        ResonForDead: {
            type: String
        },

    },
});



module.exports = RentLeadInq = mongoose.model('RentLeadInq', rentLeadInqSchema);
