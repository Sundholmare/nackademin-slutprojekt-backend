
const express = require("express")  
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require("../models/User")


/*
* Autentiserar användaren.
* Slår upp användare efter email, sedan jämförs lösenord mot databasen.
*/
router.post('/auth',function(req,res){
    let email = req.body.email;

    User.findOne({email: email}, function(err, user){
        if (user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                // Password correct
                if (result) {
                    const token = generateAccessToken({ username: user.email });
                    res.status(200).send({user: user, token: token})
                    console.log("Login successful")
                    
                } else {
                    res.sendStatus(400);
                    console.log("Login Failed")
                }
            })
        }  else {
            res.sendStatus(400);
            console.log("Email invalid")
        } 
    });
})

function generateAccessToken(username) {
    return jwt.sign(username, "hemligfras123treettfemsju", { expiresIn: '1800s' });
  }


module.exports = router;

