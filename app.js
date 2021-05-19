
const express = require('express')
const app = express()
const registerRouter = require('./router/register')

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', registerRouter)

const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.static('public'));

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
);

module.exports = app;
