// routes/profile.js (or any appropriate route file)
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as per your project structure
const authMiddleware = require('../middleware/auth'); // Middleware for authentication, if needed
const upload = require('../utils/upload'); // Utility for handling file uploads, if needed
const path = require('path'); // Node.js module for working with file paths

// PUT /api/profile/:userId - Update user profile
router.put('/:userId', authMiddleware, async (req, res) => {
  const userId = req.params.userId;
  const { profileImage } = req.files; // Assuming 'profileImage' is the name of the file field in the form

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle profile image upload if needed
    if (profileImage) {
      // Logic to handle file upload and update user profileImage field
      const fileName = `${userId}_${profileImage.name}`;
      const uploadPath = path.join(__dirname, '../uploads/profileImages', fileName);

      await profileImage.mv(uploadPath); // Move the uploaded file to the server

      // Update user's profileImage field in database
      user.profileImage = `/uploads/profileImages/${fileName}`; // Save relative path to database
    }

    // Example: Update other fields as needed
    // user.username = req.body.username;
    // user.email = req.body.email;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
