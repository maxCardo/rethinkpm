const express = require('express')


const router = express.Router();

//api routes
router.use('/web', require('./website'))
router.use('/ops', require('./ops'))
router.use('/pipeline', require('./pipeline/_pipeline'))
router.use('/off_market', require('./offMarket/_offMarket'))
router.use('/owners', require('./owners/_owners'))
router.use('/comps', require('./comps/_comps'))
router.use('/showcase', require('./showcase/_showcase'))

module.exports = router