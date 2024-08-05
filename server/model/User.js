const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// User Schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  firstName: { 
    type: String 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  mobileNumber: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String
  },
  coupon: {
    type: String
  },
  lastLogin: {
    type: Date
  },
  balance: {
    type: Number
  },
  status: {
    type: String,
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  addressList: [{
    firstName: { type: String },
    streetAddress: { type: String },
    townCity: { type: String },
    apartment: { type: String },
    pincode: { type: String },
    mobileNumber: { type: String }
  }],
});
// Combined pre-save hook
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  if (!user.userId) {
    user.userId = await User.generateUserId();
  }

  next();
});

// Static method to generate unique userId
userSchema.statics.generateUserId = async function() {
  let userId = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    userId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return userId;
};
const VALID_FOR_ALL_TIME = 'ALL_TIME_APPLY'; // Define a constant for 'valid' field

// Coupon Schema
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountPercent: {
    type: Number,
    required: true
  },
  valid: {
    type: String,
    required: true,
    enum: ['ALL_TIME_APPLY', 'SPECIFIC_DATE', 'LIMITED_USE'] // Example of possible values
  },
  usedBy: [{
    type: String // Assuming you use userId as a string
  }]
});



const Coupon = mongoose.model('Coupon', couponSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Coupon, User };
