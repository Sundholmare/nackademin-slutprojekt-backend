const jwt = require('jsonwebtoken')

const userModel = require('../models/User')

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  // console.log('authHeader is : ' , authHeader)

  const token = authHeader && authHeader.split(' ')[1]
  // console.log('token is : ', token)

  // Om det inte finns någon token så får vi error, alltså en statuskod på 401.
  if (token == null) return res.sendStatus(401)


  jwt.verify(token, "hemligfras123treettfemsju", async (err, user) => {
    // console.log(user)

    if (err) return res.sendStatus(403)

    // Retunerar ett object med den första i listan med det usernamet.
    const userModels = await userModel.findOne({ email: user.username })

    req.user = userModels

    next()

  })
}

module.exports = authenticateToken