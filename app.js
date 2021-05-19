const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public'));

// connect to db
mongoose.connect(
  'mongodb+srv://Eiser:eiser1@cluster0.wafzm.mongodb.net/SinusDB?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
);

module.exports = app;
