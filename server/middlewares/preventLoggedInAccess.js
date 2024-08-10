// middlewares/preventLoggedInAccess.js
const jwt = require('jsonwebtoken');

const preventLoggedInAccess = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  console.log('Token:', token); // Log token to see if it is being captured

  if (token) {
    try {
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token valid, user already logged in'); // Log token validation success
      // If token is valid, user is already logged in
      return res.status(403).json({ message: 'You are already logged in' });
    } catch (error) {
      // Token is invalid, allow access to login page
      console.log('Token invalid, proceeding'); // Log token validation failure
      next();
    }
  } else {
    // No token provided, allow access to login page
    console.log('No token, proceeding'); // Log no token
    next();
  }
};

module.exports = preventLoggedInAccess;
