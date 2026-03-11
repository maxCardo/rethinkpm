const express = require('express')


const router = express.Router();

//api routes
router.use('/sms', require('./sms'))


module.exports = router