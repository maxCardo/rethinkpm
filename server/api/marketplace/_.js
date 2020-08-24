const express = require('express')
const auth = require('../../middleware/auth')
const requirePermission = require('../../middleware/requirePermission')


const router = express.Router();
router.use(auth)
router.use(requirePermission('ACCESS_MARKETPLACE_BLOCK'))

//api routes
router.use('/web', require('./website'))
router.use('/ops', require('./ops'))



module.exports = router