
const express = require('express')
const app = express()
const registerRouter = require('./router/register')
const orderRouter = require('./router/order')

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', registerRouter)
app.use('/', orderRouter)

const mongoose = require('mongoose');


// connect to db
mongoose.connect(
  'mongodb+srv://Eiser:eiser1@cluster0.wafzm.mongodb.net/SinusDB?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
);

module.exports = app;
