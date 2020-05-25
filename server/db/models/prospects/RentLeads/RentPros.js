const mongoose = require('mongoose')

const rentProsSchema = new mongoose.Schema({
    
    firstName: String, 
    lastName: String,
    fullName: String,
    email:[
        {
            adresss: String, 
            isPrimary: Boolean
        }
    ],
    phone:[
        {
            number: String, 
            isPrimary: Boolean,
            okToText: Boolean
        }
    ]

})

//notes, leadOwner, createData, lastContact, status, reason for loss,  implmented on rentInq


module.exports = mongoose.model('rentPros', rentProsSchema)