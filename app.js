const express = require('express');
const app = express();
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
