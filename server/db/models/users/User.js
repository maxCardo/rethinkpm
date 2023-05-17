const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required: true,
    unique:true
  },
  phone:{
    type: Number,
    required: true,
    unique:true
  },
  avatar:{
    type: String
  },
  profiles:[],
  date:{
    type: Date,
    default: Date.now
  },
  tokens:[{
    token:{
      type:String,
      required: true
    }
  }]
});

//-----------------  Schema Middleware & Functions  -------------------------//

//salt and hash password
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next()
});

//set gravatar when email is created or updated
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('email')) {
    user.avatar = gravatar.url(user.email, {s:'200',r:'pg',d:'mm'});
  }
  next()
});

//Get Auth Token
userSchema.methods.getToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({token});
  await user.save()
  return token;
}



module.exports = User = mongoose.model('User', userSchema);
