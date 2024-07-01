// utils/generateToken.js

const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (userId) => {
  // Create a token with user ID as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
  return token;
};

module.exports = generateToken;
