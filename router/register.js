const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())


const checkRepeatPassword = (pass1, pass2) => {
    if (pass1 === pass2) return true
}



router.post('/register', async (req, res) => {
    User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] }, function (err, user) {
        if (err) console.log(err)
        if (user) {
            console.log(`This name: ${user.name} or this email: ${user.email} is already exists`)
            res.end();
        } else {
            console.log(`This is a new user`)
            if (checkRepeatPassword(req.body.password, req.body.repeatPassword)) {
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
            } else console.log(`Different passwords`)
        }
    })
})



module.exports = router;