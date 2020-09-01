const express = require('express')


const router = express.Router();

//api routes
router.use('/web', require('./website'))
router.use('/ops', require('./ops'))



module.exports = router