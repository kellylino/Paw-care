const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authorization.split(' ')[1]; // Extract the token part

  jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.user_id = decoded.id; // user ID is stored in the token payload
    req.username = decoded.username;
    next();
  });
};

module.exports = { tokenExtractor };
