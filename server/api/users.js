const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../db/models/users/User');
const auth = require('../middleware/auth');
const useUnless = require('../middleware/useUnless')

const router = express.Router();

router.use(useUnless(auth, ['/', '/login']))

// @route: Post /api/user;
// @desc: create new user
// @ access: Public1
router.post('/', async(req,res) => {
  try {
    const user =  await new User(req.body);
    await user.save();
    const token = await user.getToken();
    await res.cookie('sid', token);
    res.send({user});

  } catch (e) {
    console.error(e.message);
    res.status(400).json({errors:[{msg:'somthing went wrong'}]});
  }
});

// @route: GET /api/users;
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

// @route: GET /api/users/all;
// @desc: get all users
// @ access: Private
router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, tokens: 0 }); // Exclude sensitive fields
    res.status(200).json(users);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//Todo: create get route for checking tokens that does not send error if no token exists or token is not valid;

// @route: Post /api/users/login;
// @desc: log in user
// @ access: Public
router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {return res.status(400).json({errors:[{msg:'Invalid User Name'}]})};
    const passVarify = await bcrypt.compare(password, user.password);
    if (!passVarify) {return res.status(400).json({errors:[{msg:'Invalid Creds'}]})};
    const token = await user.getToken();
    await res.cookie('sid', token);
    res.json({user});
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});


// @route: Post /api/users/logout;
// @desc: log out user
// @ access: Private
router.post('/logout', async(req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    const user = await req.user.save()
    await res.clearCookie('sid');
    res.json('user loged out')
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error')
  }
});

// @route: Post /api/users/logout/all;
// @desc: log out all devices
// @ access: Private
router.get('/logout/all', async(req,res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send('all users signed out');
  } catch (e) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
