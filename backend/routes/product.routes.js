const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// 🔥 DELETE product (THIS FIXES YOUR ERROR)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;

// UPDATE product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});
// GET single product by ID
router.get('/:id', async (req, res) => {
  try {

    const id = req.params.id;

    console.log("Fetching product ID:", id);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    console.error("GET PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error fetching product"
    });

  }
});

