const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Correct the path as per your project structure

const isAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Authorization token not found');
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    req.user = user; // Attach user object to request object for use in subsequent middleware/routes
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = isAdmin;
