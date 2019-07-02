const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  date:{
    type: Date,
    default: Date.now
  }
});

//Schema Middleware & Functions

//salt and hash password
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next()
});


module.exports = User = mongoose.model('user', userSchema);
