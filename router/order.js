const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')

const orderModel = require('../models/Order')

/* GET - Returnerar en lista på samtliga ordrar för admins,
och ägda orders för inloggad användare */

// Hämta alla ordrar från db för admins
// Hämta alla ordrar för en speciell användare med hjälp av id

// Routes, där jag importerar get och post requesten från controllern
Router.get('/orders', async (req, res) => {
    // Hämta alla befintliga ordrar och retunera dem
    const orders = await orderModel.find({})
    res.json(orders)
})



/* POST - Skapar en ny order, se order-modell. */
// Skapa en ny order med hjälp av mallen nedan

/*{
    _id: 123,
    timeStamp: Date.now(),
    status: 'inProcess',
    items: [ <productId1>, <productId2>, ... ],
    orderValue: 999
} */

// Skapar en POST-request för att skapa en ny order
Router.post('/orders', async (req, res) => {

    const newOrder = new orderModel({
        _id: new mongoose.Types.ObjectId(),
        items: req.body.items
    })
    
    try {
        await newOrder.save()
    } catch(err) {
        console.error(err)
        return res.status(500).json(err)
    }

    res.json(newOrder)
    
})

module.exports = Router