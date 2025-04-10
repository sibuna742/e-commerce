const express = require('express');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email,password, role } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  try{

    const user = new User({ name, email, password,role });
    await user.save();
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // res.status(201).json({ token });
  res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
  

});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try{
    const user = await User.findOne({ email });
    
  
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({user:user, token });
  }catch (error) {
        res.status(500).json({ message: 'Error logging in' });
      }
});




// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const tokenPayload = { id: user._id, role: user.role };
//     const token = jwt.sign(tokenPayload, 'your_jwt_secret', { expiresIn: '1h' });
//     res.json({ token: `Bearer ${token}` });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });

module.exports = router;
