const jwt = require('jsonwebtoken');

const authenticate = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized access' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });

      req.user = decoded;
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: `Access forbidden for ${req.user.role}` });
      }

      next();
    });
  };
};

module.exports = authenticate;
