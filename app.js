require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const register_Router = require('./router/register')
const createProduct_Router = require('./router/createProduct')
const productsRouter = require('./router/products')
const orderRouter = require('./router/order')
const authRouter = require('./router/auth')

// Middleware
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/api', register_Router)
app.use('/api', createProduct_Router)
app.use('/api', productsRouter)
app.use('/api', orderRouter)
app.use('/api', authRouter)


// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
)

module.exports = app