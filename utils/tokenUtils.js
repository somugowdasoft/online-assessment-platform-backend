const jwt = require('jsonwebtoken');

const createToken = async (user) => {
    return await jwt.sign(
      { userId: user._id, role: user.role },  // Payload: userId and role
      process.env.JWT_SECRET,                 // Secret from the environment variable
      { expiresIn: '1d' }                     // Token expiration time of 1 day
    );
  };

  module.exports = createToken;
