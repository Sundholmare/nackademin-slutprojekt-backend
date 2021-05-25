
const express = require('express')
const router = express.Router()
const Products = require('../models/Products')
const mongoose = require('mongoose');
const loggedIn = require('../middleware/loggedIn')


// const cookieParser = require('cookie-parser')
// app.use(cookieParser())


router.post('/products',loggedIn, (req, res) => {

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
            console.log(newProducts)
            res.json('New product is added now')
        }
    })


})



module.exports = router;