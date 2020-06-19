const mongoose = require('mongoose')

const rentProsSchema = new mongoose.Schema({
    
    firstName: String, 
    lastName: String,
    fullName: String,
    email:[
        {
            address: String, 
            isPrimary: Boolean
        }
    ],
    phoneNumbers:[
        {
            number: String, 
            isPrimary: Boolean,
            okToText: Boolean
        }
    ],
    targetArea: Array,
    targetZip: Array,
    pets: [{
        type:String,
        breed:String
    }],
    otherPref: Array,
    income: Number,

})

module.exports = rentPros =  mongoose.model('rentPros', rentProsSchema)