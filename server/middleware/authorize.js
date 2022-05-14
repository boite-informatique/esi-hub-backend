const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateAccessToken } = require('../controllers/userController')

module.exports = asyncHandler(async (req, res, next) => {
  const {accessToken, refreshToken} = req.cookies

  // check if there is a refresh token
  if (!refreshToken) {
    res.status(401)
    throw new Error('Unauthorized, no refresh token')
  }

  let token
  // check if access token exists and is valid

  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {

    const user = await getUser(refreshToken)


    if (!user) {
      res.status(401)
      throw new Error('Unauthorized, invalid refresh token')
    }

    token = generateAccessToken(user)

    res.cookie('accessToken', token, {httpOnly : false, sameSite : true, maxAge : 15 * 60 * 1000})

    req.user = jwt.decode(token)
    next()
    } else {
      req.user = decoded
      next()
    }
  })
})

const getUser = async (refreshToken) => {
  // returns user if found and refresh token is valid, null otherwise
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

  if (!decoded) {
   return null 
  }

  const user = await User.findById(decoded.id)

  if (!user) {
    return null
  }

  return user.refreshTokens.includes(refreshToken) ? user : null
}
