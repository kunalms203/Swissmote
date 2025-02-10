const jwt = require("jsonwebtoken");
const blacklistedToken = require("../models/BlackLIstedToken");

module.exports = async(req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extracts only the token

  const isBlacklisted = await blacklistedToken.findOne({ token });
  console.log(isBlacklisted);
  if (isBlacklisted) return res.status(403).json({ message: 'Token is blacklisted' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

