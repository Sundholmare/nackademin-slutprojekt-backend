const router = require('express').Router();
const Product = require('../models/Products');

//Middleware för att verifiera token
const authenticateToken = require('../middleware/loggedIn'); 

// Hämtar alla produkter
router.get('/products', async (req, res) => {
  const allProducts = await Product.find({}); // variabel för att hämta alla produkter
  res.json(allProducts);
});

// hämtar specifik produkt efter ID
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById({ // Variabel för att hämta enstaka produkt
    _id: req.params.id,
  });
  res.json(product);
});

router.patch('/products/:id', authenticateToken, async (req, res) => {
  try {
    // Variabel för den valda produkten
    const current = await Product.findById(req.params.id); 

    // Variabel för att hitta och modifiera vald produkt.
    const item = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          // Ändrar till valda värdet eller grundvärdet i produkten.
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
    // Variabel för den borttagna produkten
    const removedItem = await Product.deleteOne({
      _id: req.params.id,
    });

    res.json(removedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
