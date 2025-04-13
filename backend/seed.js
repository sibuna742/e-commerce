const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./model/Product');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedProducts();
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

const seedProducts = async () => {
  const products = [
    {
      name: 'Laptop',
      description: 'High performance laptop for work and gaming.',
      price: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D',
      category: 'Electronics',
      stock: 50,
    },
    {
      name: 'Phone',
      description: 'Latest smartphone with great camera.',
      price: 800,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8fDA%3D',
      category: 'Electronics',
      stock: 100,
    },
    {
      name: 'Coffee Mug',
      description: 'Ceramic coffee mug with unique design.',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1533776992670-a72f4c28235e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww',
      category: 'Kichen',
      stock: 200,
    },
    {
      name: 'New Balance',
      description: 'New Balance.',
      price: 35,
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3JTIwYmFsYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'Fashion',
      stock: 200,
    },
    {
      name: 'Nike sneaker',
      description: 'Nike sneaker.',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1655853548169-646b6e0f15ca?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlrZSUyMHNuZWFrZXJ8ZW58MHx8MHx8fDA%3D',
      category: 'Fashion',
      stock: 200,
    },
   
    {
      name: 'New Balance',
      description: 'New Balance.',
      price: 35,
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3JTIwYmFsYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'Fashion',
      stock: 200,
    },
    {
      name: 'Jewlery',
      description: 'Jewlery.',
      price: 4,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amV3bGVyeXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'Fashion',
      stock: 200,
    },
    {
      name: 'Jewlery',
      description: 'Jewlery.',
      price: 5,
      imageUrl: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amV3bGVyeXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'Fashion',
      stock: 200,
    },
    {
      name: 'Headphones',
      description: 'Noise-cancelling over-ear headphones.',
      price: 150,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
      category: 'Electronics',
      stock: 75,
    },
  ];

  try {
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding products:', err);
  }
};
