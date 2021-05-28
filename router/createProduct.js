
const express = require('express')
const router = express.Router()
const Products = require('../models/Products')
const mongoose = require('mongoose');
const loggedIn = require('../middleware/loggedIn')



router.post('/products', loggedIn, (req, res) => {

  /* vi kollar först vad har vi i ( req.user.role), och (req.user ) är en attributes  som vi skapar i "loggedIn" middleware och som inehåller data om användaren som finns med i token och i vår DB  */

    if (req.user.role === 'admin') {

        const newProducts = new Products({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            price: req.body.price,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            imgFile: req.body.imgFile,

        })
        newProducts.save((err) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
            else {
                // console.log(newProducts)
                res.json('New product is added now')
            }
        })

    } else res.send('You are not admin')



})



module.exports = router;