const express = require('express');

const User = require('../db/models/User');

const router = express.Router();


// @route: Post /api/user;
// @desc: create new user
// @ access: Public
router.post('/', async(req,res) => {
  try {
    //see if user exisits
    //get user gravatar
    //encrypt password
    const user = new User(req.body);
    user.save()
    res.send('user saved')

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error')
  }
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
