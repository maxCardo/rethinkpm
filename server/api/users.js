const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../db/models/User');
const auth = require('../middleware/auth');

const router = express.Router();


// @route: Post /api/user;
// @desc: create new user
// @ access: Public
router.post('/', async(req,res) => {
  try {
    const user =  await new User(req.body);
    await user.save();
    const token = await user.getToken();
    res.send({user, token});

  } catch (e) {
    console.error(e.message);
    res.status(400).send(e);
  }
});

// @route: GET /api/user;
// @desc: get user by token
// @ access: Private
router.get('/', auth, (req,res) => {
  try {
    res.status(201).json(req.user);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

// @route: Post /api/users/login;
// @desc: log in user
// @ access: Public
router.post('/login', async (req,res) => {
  console.log('fire useer route');
  const {email, password} = req.body;
  console.log(email, password)
  try {
    let user = await User.findOne({email});
    if (!user) {return res.status(400).json({errors:[{msg:'Invalid User Name'}]})};
    const passVarify = await bcrypt.compare(password, user.password);
    if (!passVarify) {return res.status(400).json({errors:[{msg:'Invalid Creds'}]})};
    const token = await user.getToken();
    await res.cookie('sid', token);
    res.json({user, token});
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});


// @route: Post /api/user;
// @desc: log out user
// @ access: Private
router.post('/logout', auth, async(req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    const user = await req.user.save()
    res.json('user loged out')
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error')
  }
});

// @route: Post /api/user/logout;
// @desc: log out all devices
// @ access: Private
router.get('/logout/all', auth, async(req,res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send('all users signed out');
  } catch (e) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
