require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/User')

/* 
* Middleware för att kontrollera tokenen är äkta
*/
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
 
  // Om token inte finns skicka 401
  if (token == null) return res.sendStatus(401)

  // Verifierar token 
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {

    // Om token inte kunde verifieras skicka 403.
    if (err) return res.sendStatus(403)

    // Retunerar ett object med den första i listan med det usernamet.
    const userModels = await userModel.findOne({ email: user.username })

    req.user = userModels

    next()

  })
}

module.exports = authenticateToken