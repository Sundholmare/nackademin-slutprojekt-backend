const router = require('express').Router();
const Product = require('../models/Products');
const authenticateToken = require('../middleware/loggedIn');

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

router.patch('/products/:id', authenticateToken, async (req, res) => {
  try {
    const current = await Product.findById(req.params.id);
    const item = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title || current.title,
          price: req.body.price || current.price,
          shortDesc: req.body.shortDesc || current.shortDesc,
          longDesc: req.body.longDesc || current.longDesc,
        },
      }
    );

    res.json(item);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    const removedItem = await Product.deleteOne({
      _id: req.params.id,
    });

    res.json(removedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
