const jwt = require('jsonwebtoken');
const userModel = require('../models/User')

/*
* Verifierar att token är äkta
* Används EJ just nu
*/

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, "hemligfras123treettfemsju", async (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    const userModels = await userModel.findOne({ email: user.username })

    req.user = userModels

    next()
  })
}

module.exports = authenticateToken