const router = require('express').Router();
const Product = require('../models/Products');

// get all products
router.get('/products', async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
});

// get specifik product with id
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById({
    _id: req.params.id,
  });
  res.json(product);
});

module.exports = router;
