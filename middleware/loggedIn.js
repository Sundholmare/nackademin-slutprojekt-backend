const jwt = require('jsonwebtoken');

const userModel = require('../models/User');
require('dotenv').config();

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // console.log('authHeader is : ' , authHeader)

  const token = authHeader && authHeader.split(' ')[1];
  // console.log('token is : ', token)

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    // console.log(user)

    if (err) return res.sendStatus(403);

    // Retunerar ett object med den första i listan med det usernamet.
    const userModels = await userModel.findOne({ email: user.userMail });

    req.user = userModels;

    next();
  });
}

module.exports = authenticateToken;
