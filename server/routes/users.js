const express = require('express');

const config = require('../config');
const User = require('../db/models/User');

const router = express.Router();

router.post('/' (req,res) => {
  res.send('yo yo')
})
