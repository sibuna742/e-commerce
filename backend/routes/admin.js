const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeAdmin');

router.get('/dashboard', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;
