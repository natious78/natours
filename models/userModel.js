const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Please tell us your name']
  },
  email: {
    type: String,
    required: [true, ' Please provide your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, ' Please provide your password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, ' Please confirm your password'],
    validate: {
      // this is only works on create and save!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not the same'
    }
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function(next) {
  // only run this function if password was actualy modified
  if (!this.isModified('password')) return next();

  // Hash the passsword with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passWordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false means not changes
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
