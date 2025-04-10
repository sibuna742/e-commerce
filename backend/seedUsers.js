const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/User');
const bcrypt = require('bcryptjs');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedUsers();
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

const seedUsers = async () => {
  const users = [
    {
      name: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      isAdmin: true,
    },
    {
      name: 'user',
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      isAdmin: false,
    },
  ];

  try {
    await User.insertMany(users);
    console.log('Users seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};
