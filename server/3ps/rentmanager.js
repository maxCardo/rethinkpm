//connection to rentmanger routes through blackMagic
const axios = require('axios')

const test = 'http://localhost:8080'
const prod = 'https://more-black-magic.herokuapp.com'
const url = process.env.NODE_ENV === 'production' ? prod : test 

const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };


//@desc: create ticket for showcase deal and set appointment
const schShowcase = async (data) => {
    try {
        const res = await axios.post(`${url}/api/rentmanager/showcase/sch`, data, config)
        return res.data
        
    } catch (err) {
        console.log('error connecting to black_magic')
        return 'error'
    }   
}


module.exports = {schShowcase}