const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, 'JWT_SECRET', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.user_id = decoded.id; // user ID is stored in the token payload
    next();
  });
};

module.exports = { tokenExtractor };
