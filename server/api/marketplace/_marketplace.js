const express = require('express')


const router = express.Router();

//api routes
router.use('/web', require('./website'))
router.use('/ops', require('./ops'))
router.use('/pipeline', require('./pipeline/_pipeline'))
router.use('/owners', require('./owners/_owners'))

module.exports = router