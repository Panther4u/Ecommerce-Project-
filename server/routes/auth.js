// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../model/User');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config'); // Import config
const generateToken = require('../utils/generateToken');


// POST /auth/signup - User signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, mobileNumber, addressLine1, addressLine2, pincode } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Generate unique userId
    const userId = await User.generateUserId();

    // Create new user instance
    const newUser = new User({
      userId,
      username,
      email,
      password,
      mobileNumber,
      addressLine1,
      addressLine2,
      pincode
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ error: 'An error occurred during sign-up. Please try again.' });
  }
});



// POST /auth/login - User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        pincode: user.pincode,
        profileImage: user.profileImage,
        lastLogin: user.lastLogin,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});

module.exports = router;

