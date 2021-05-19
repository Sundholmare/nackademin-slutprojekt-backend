const express = require('express')
const Router = express.Router()
const orderController = require('../controllers/orderController')


// Routes, där jag importerar get och post requesten från controllern
Router.get('/api/orders', orderController.getOrders)
Router.post('/api/orders', orderController.postOrders)

module.exports = Router