// // authMiddleware.js

// const jwt = require('jsonwebtoken');
// const User = require('../model/User');

// const authenticateJWT = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in Authorization header

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.userId);

//       if (!user) {
//         throw new Error('User not found');
//       }

//       req.user = user; // Attach user object to request
//       next();
//     } catch (error) {
//       console.error('JWT verification error:', error);
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   } else {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// module.exports = authenticateJWT;
// auth.js

// auth.js middleware example
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
