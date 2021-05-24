const express = require('express')
const app = express()
const register_Router = require('./router/register')
const createProduct_Router = require('./router/createProduct')
const productsRouter = require('./router/products');
const authRouter = require('./router/auth')
const mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use('/api', register_Router)
app.use('/api', createProduct_Router)
app.use('/api', authRouter)
app.use('/api', productsRouter)





// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
);

module.exports = app;
