const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')

const orderModel = require('../models/Order')
const authenticateToken = require('../middleware/loggedIn')

// Lägger till middleware så det körs innan min GET-request.
Router.get('/orders', authenticateToken, async (req, res) => {

    let orders
    if (req.user.role === 'admin') {
        // Om den inloggade är admin, så visas en lista för alla lagda ordrar
        // och även orderValue på alla ordrar
        // populate() kollar i items listan efter ref och tar reda på från vilken collection items kommer från.
        orders = await orderModel.find({}).populate('items')
    
    } else {
        // om inte, visas alla ordrar för den specifika inloggade användaren
        // OrderValue för inloggade användare.
        orders = await orderModel.find({
            userId: req.user._id
        }).populate('items')

    }
    // mappar genom alla orders 
    orders = orders.map((order) => {
        // Väljer den första produkten i ordern och räknar ut totalsumman på hela arrayen.
        let totalOrder = [0, ...order.items].reduce((acc, cur) => {
            return acc + cur.price
        })
 
        order.orderValue = totalOrder // lägger till egenskapen orderValue på alla orders.

        return order
    })

    res.json(orders)

})

// POST-request för att skapa en ny order
// Lägger till middleware så det körs innan min POST-request.
Router.post('/orders', authenticateToken, async (req, res) => {
    
    // Skapar ett object av orderModel och lägger in all data från body
    const newOrder = new orderModel({
        _id: new mongoose.Types.ObjectId(),
        items: req.body.items,
        userId: req.user._id
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
  
})

module.exports = Router