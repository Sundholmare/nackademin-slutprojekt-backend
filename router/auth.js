
require('dotenv').config()
const express = require("express")  
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require("../models/User")

/*
* Autentiserar användaren.
* Slår upp användare efter email, sedan jämförs lösenord mot databasen.
*/
router.post('/auth', function (req,res) {
    // Sparar emailen från request i en variabel.
    let email = req.body.email;

    // Kollar om det finns användare i databasen med angiven email.
    User.findOne({email: email}, function(err, user){ 

        // Om användaren hittas 
        if (user){

            // Jämför angivna lösenord mot hashade lösenordet i databasen.
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                // Password correct
                if (result) {
                    
                    // Generar JWT-token, skicka sedan status 200, user och token.
                    const token = generateAccessToken({ userMail: user.email });
                    res.status(200).send({user: user, token: token})
                    console.log("Login successful")
                    
                    
                } else {
                    // Om fel lösenord skicka status 400
                    res.sendStatus(400);
                    console.log("Login Failed")
                }
            })
        }  else {
            // Om fel email skicka status 400
            res.sendStatus(400);
            console.log("Email invalid")
        } 
    });
})

/*
* Funktion för att generera JWT-token som håller i 30 min.
*/
function generateAccessToken(userMail) {
    return jwt.sign(userMail, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

module.exports = router;
