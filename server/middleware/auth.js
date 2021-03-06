const jwt = require('jsonwebtoken');


const {jwtSecret} = require('../config/creds');
const User = require('../db/models/users/User')

const auth = async (req,res,next) => {
  // x-auth token header was used for postman api, for production we will use the header in the cookie
  //const token = req.header('x-auth-token');
  const token = req.cookies.sid;
  if (!token) {
    return res.status(401).send('No Token, Auth Failed');
  };
  try {
    const decode = jwt.verify(token, jwtSecret);
    const user = await User.findOne({_id:decode._id, 'tokens.token': token});
    req.token = token;
    req.user = user;
    next();

  } catch (e) {
    res.status(401).json({msg:'Token is not valid'})
  }
}

module.exports = auth;
