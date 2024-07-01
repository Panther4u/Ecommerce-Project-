// // models/User.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   emailOrPhone: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     // Making email field optional
//     required: false
//   },
//   googleId: {
//     type: String,
//     // Making googleId field optional
//     required: false
//   },
//   address: { type: String },
//   // Add other fields as needed
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the User schema
// const userSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String
//   },
//   phoneNumber: {
//     type: String
//   },
//   googleId: {
//     type: String
//   },
//   // Add more fields as needed
// }, { timestamps: true });

// // Create the User model
// const User = mongoose.model('User', userSchema);

// module.exports = User;
// user.js
// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
  firstName: { type: String },
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
  streetAddress: {
    type: String,
    trim: true
  },
  townCity: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String
  },
  apartment: String,
  coupon: String,
  lastLogin: Date,
});

// Hash password before saving user to database
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
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

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true },
  validUntil: { type: Date, required: true },
  usedBy: { type: String, required: true },  // User ID who owns this coupon
});


const Coupon = mongoose.model('Coupon', couponSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Coupon, User };
