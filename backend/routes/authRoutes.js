const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlacklistedToken = require("../models/BlackLIstedToken");
const authMiddleware = require("../middleware/authMiddleware");
const redis = require('redis');

const redisClient = redis.createClient();

const router = express.Router();
// Register
router.post("/register", async (req, res) => {
  try{const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();
  res.status(201).json({ message: "User registered" });}catch(err){
    res.status(500).json({ message: "User already exists" });
  }
  
});

// Login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    // Decode token to get expiration time
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert to Date format

    // Store token in MongoDB
    const blacklisttoken = await BlacklistedToken({ token, expiresAt });
    await blacklisttoken.save();

    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
