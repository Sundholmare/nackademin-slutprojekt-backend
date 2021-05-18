const express = require('express')
const app = express()
const registerRouter = require('./router/register')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.use('/', registerRouter)


module.exports = app