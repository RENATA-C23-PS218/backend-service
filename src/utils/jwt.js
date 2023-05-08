const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

module.exports = generateToken;
