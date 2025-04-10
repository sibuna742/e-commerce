const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/Auth')
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/userRoutes')
// const paymentRoutes = require('./routes/checkout');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/payment', paymentRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
