const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')

const orderModel = require('../models/Order')
const loggedIn = require('../middleware/loggedIn')

/* GET - Returnerar en lista på samtliga ordrar för admins,
och ägda orders för inloggad användare */

Router.get('/orders', loggedIn, async (req, res) => {
    // Hämta alla befintliga ordrar och retunera dem
    const orders = await orderModel.find({})
    res.json(req.user)

    // Retunera en lista på samtliga ordrar för admin

    // Retunera en lista på ägda orders för inloggade användare
})








/* POST - Skapar en ny order, se order-modell. */
/*{
    _id: 123,
    timeStamp: Date.now(),
    status: 'inProcess',
    items: [ <productId1>, <productId2>, ... ],
    orderValue: 999
} */

// Skapar en POST-request för att skapa en ny order
Router.post('/orders', async (req, res) => {
    //return res.json(req.body)
    
    // Skapar ett object av orderModel och lägger in all data från body
    const newOrder = new orderModel({
        _id: new mongoose.Types.ObjectId(),
        items: req.body.items
    })

    // Skickar sedan newOrder och sparar i databasen.
    // Await för att inte koden ska fortsätta köras förens koden skickats tillbaka och fått status 200.
    try {
        await newOrder.save()
    } catch(err) {
        console.error(err)
        return res.status(500).json(err)
    }

    // retunerar newOrder som ett json
    res.json(newOrder)

    // Vill hämta information om användaren som skapar ordern

    
})

module.exports = Router