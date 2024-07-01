const User = require('../model/User');
const multer = require('multer');
const path = require('path');
const { validationResult } = require('express-validator'); // Import if you're using validation

const fs = require('fs');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Adjust the destination directory as per your server setup
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });


const UserController = {
  updateProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      // Ensure userId is correctly used in the update operation
      const { username, email, addressLine1, addressLine2, pincode, mobileNumber } = req.body;
      const profileImage = req.file ? req.file.path : '';

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
          addressLine1,
          addressLine2,
          pincode,
          mobileNumber,
          profileImage,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
  },
};


module.exports = UserController;


// Middleware to handle errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Update user profile controller
const updateProfile = async (req, res) => {
  const { _id } = req.params; // Extract _id from request parameters
  const { name, email } = req.body; // Extract name and email from request body

  try {
    // Validate _id
    if (!_id) {
      return res.status(400).json({ message: '_id is required' });
    }

    // Update user profile using Mongoose findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Send updated user data back to client
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateProfile,
};