const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())

// 1-behöver vi kolla om man är inloggad med hjälp av cookie ?
//2-kolla om användaren finns redan?
//3-email i moduel behöver fixas 
// 4-zip i moduel behöver vara number
// 5-orderHistory ska kopplas vid register eller inte



router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) res.json(err)
        else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                role: 'customer',
                email: req.body.email,
                password: hash,
                name: req.body.name,
                adress: {
                    street: req.body.adress.street,
                    zip: req.body.adress.zip,
                    city: req.body.adress.city,
                }
            })
            newUser.save((err) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                }
                else {
                    console.log(newUser)
                    res.json(newUser)
                }
            })
        }
    })
})



module.exports = router;