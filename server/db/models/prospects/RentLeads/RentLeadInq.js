const mongoose = require('mongoose');

const rentLeadInqSchema = new mongoose.Schema({
    
    prospect:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'RentLeadPros'
    },

    DateInq:{
        type: Date,
        default: Date.now()
    },

    listing:{
        type: String
    },

    status: {
        // current status new, engaged, scheduled, toured, application, cold, dead
        currentStatus: {
            type: String,
            required: true,
            default: 'new'
        },

        lastActive: {
            type: Date,
            default: Date.now
        },
        //status new
        new: {
            
            numFlwUps: {
                type: Number,
                default: 0 
            },

        },

        //status engaged: pros has replyed to a contact but has not yet schedualed an appointment
        engaged:{
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
    notes: [{
        note: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],

});


module.exports = RentLeadInq = mongoose.model('RentLeadInq', rentLeadInqSchema);
