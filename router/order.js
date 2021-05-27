const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')

const orderModel = require('../models/Order')
const loggedIn = require('../middleware/loggedIn')

// Lägger till middleware(loggedIn) så det körs innan min GET-request.
Router.get('/orders', loggedIn, async (req, res) => {

    let orders
    // Om den inloggade är admin så visas alla ordrar i en lista
    if (req.user.role === 'admin') {
        // OrderValue för admin!
        orders = await orderModel.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'items',
                    foreignField: '_id',
                    as: 'items'
                }
            },
            {
                $addFields: {
                    orderValue: { 
                        $sum: "$items.price"
                    }
                }
            }
        ])
    } else {
        // om inte, visas alla ordrar för den specifika inloggade användaren
        orders = await orderModel.aggregate([
            {
                $match: {
                    userId: req.user._id
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items',
                    foreignField: '_id',
                    as: 'items'
                }
            },
            {
                $addFields: {
                    orderValue: { 
                        $sum: "$items.price"
                    }
                }
            }
        ])
    }
    res.json(orders)

})

// Skapar en POST-request för att skapa en ny order
// Lägger till middleware(loggedIn) så det körs innan min POST-request.
Router.post('/orders', loggedIn, async (req, res) => {
    
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