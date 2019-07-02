const express = require('express');

const User = require('../db/models/User');

const router = express.Router();


// @route: Post /api/user;
// @desc: create new user
// @ access: Public
router.get('/', (req,res) => {
  res.send('yo yo')
});

// @route: GET /api/user;
// @desc: sign in user
// @ access: Private
router.get('/', (req,res) => {
  res.send('yo yo')
});

// @route: Post /api/user;
// @desc: log out user
// @ access: Private
router.get('/', (req,res) => {
  res.send('yo yo')
});

module.exports = router;
