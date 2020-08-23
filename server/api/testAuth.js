const express = require('express');
const auth = require('../middleware/auth')
const requirePermission = require('../middleware/requirePermission')

const router = express.Router();

router.use(auth)
router.use(requirePermission('ACCESS_BUYER_BLOCK'))

router.get('/', (req,res) => {
  res.send('Route reached')
})



module.exports = router;