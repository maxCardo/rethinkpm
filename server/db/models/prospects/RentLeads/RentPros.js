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
    ]

})


module.exports = rentPros =  mongoose.model('rentPros', rentProsSchema)