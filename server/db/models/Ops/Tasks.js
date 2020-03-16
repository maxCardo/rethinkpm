const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        property: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        availability: [Number],
    },
    task:{
        type: {
            type: String,
            required: true
        },
        discription: {
            type: String,
            required: true
        },
        reqDate: {
            type: Date,
            default: Date.now,
        },
        status:{
            type: String,
            default: 'new'
        },
        assigned:{
            assigned:{
                type: Boolean,
                default: false
            },
            vendor:{
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                //ref: 'Vendor'
            }
        }
    },
    visits:[{
        visit : {
            vendor:{
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                //ref: 'Vendor'
            },
            schDate:{
                type: Date,
                require: false
            },
            actDate:{
                date:{
                    type: Date,
                    require: false
                },
                startTime:{
                    type: Date,
                    require: false
                },
                endTime:{
                    type: Date,
                    require: false
                },
            }
        }
    }],
    history: {
        logs: [{
            log:{
                type: String,
                require: false
            }
        }],
        notes: [{
            note:{
                type: String,
                require: false
            }
        }],
    }    
});

module.exports = Task = mongoose.model('Task', taskSchema);