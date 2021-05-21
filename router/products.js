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


router.patch('/products/:id', async(req, res) => {
  try{
    const item = await Product.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: {title: req.body.title,
      price: req.body.price,
      shortDesc: req.body.shortDesc,
      longDesc: req.body.longDesc}})
    
      await res.json(item);
  }catch(err){
    res.json({message:err})
  }
});


router.delete('/products/:id', async (req, res) => {
  try{
    const removedItem = await Product.deleteOne({
      _id: req.params.id
    });

    res.json(removedItem);
  }catch(err){
    res.json({message: err})
  }
})

module.exports = router;