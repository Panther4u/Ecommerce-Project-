const mongoose = require('mongoose');

// Define Admin schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
  profileImage: {
    type: String,
    default: '', // Path to default avatar or empty string if no image
  },
  townCity: {
    type: String,
    trim: true
  },
  mobileNumber: {
    type: String,
    trim: true
  },
  streetAddress: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
});

// Create Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
