const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');
const authMiddleware = require('../middleware/Auth'); // Correct path
require('dotenv').config(); // Load environment variables

const router = express.Router();


// Signup Route
router.post('/signup', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Create new user directly without hashing the password
      const newUser = new User({ username, password }); // Use the plain password
      await newUser.save();

      // Log the signup action
      const log = new Log({
          username,
          input: `Signup attempt for ${username}`,
          output: 'Signup successful',
      });
      await log.save();

      res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: 'Signup failed', error: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
  }
});



// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Use the comparePassword method
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, userId: user._id }); // You can return any other user info if needed
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



// Protected route example (just to show how middleware works)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;
