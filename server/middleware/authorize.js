const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

module.exports = asyncHandler(async (req, res, next) => {
  // check if token exists
  if (!req.cookies.token) {
    res.status(401)
    throw new Error('Unauthorized, no token')
  }

  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
  if (!decoded) {
    res.status(401)
    throw new Error('Unauthorized, expired token')
  }

  req.user = await User.findById(decoded.id).select('-password -__v').populate('groups', 'name')
  req.admin = req.user.groups.includes('admin')
  next()
})
