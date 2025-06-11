const express = require('express')
    
const router = express.Router();

//api routes
router.use('/leaselead', require('./leaselead'))


module.exports = router