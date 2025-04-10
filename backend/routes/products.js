const express = require('express');
const Product = require('../model/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add new product
router.post('/', async (req, res) => {
  const { name, description, price, imageUrl, category, stock } = req.body;
  const newProduct = new Product({ name, description, price, imageUrl, category, stock });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Edit a product
// router.put('/:id', async (req, res) => {
//   const { name, description, price, imageUrl, category, stock } = req.body;
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Update product fields
//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price || product.price;
//     product.imageUrl = imageUrl || product.imageUrl;
//     product.category = category || product.category;
//     product.stock = stock || product.stock;

//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// Update a product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true } // return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
