require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here', // JWT secret key
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/your_database', // MongoDB connection URI
  // Add more configuration variables as needed
};
