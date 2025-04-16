const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Assuming you have a User model
const authenticateToken = require('../middleware/auth');
const authorizeAdmin = require('../middleware/authorizeAdmin');


// Get all users text
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const newUser = new User({ name, email, role, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Edit an existing user
router.put('/:id', authenticateToken,authorizeAdmin, async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete a user
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});


module.exports = router;
