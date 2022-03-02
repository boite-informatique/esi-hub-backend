const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if account already exists
  const checkUser = await User.findOne({ email })
  if (checkUser) {
    res.status(400)
    throw new Error('Account already exists')
  }

  // hash password and create account
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({
    name: user.name,
    email: user.email
  })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find user in database

  const user = await User.findOne({ email })

  if (!user || !await bcrypt.compare(password, user.password)) {
    res.status(400)
    throw new Error('Email or password incorrect')
  }

  // in case user found

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accessToken: generateToken(user.id)
  })
})

const updateUser = asyncHandler(async (req, res) => {
  // verify if the user is authorized to modify users

  if (req.params.id !== req.user._id) {
    res.status(401)
    throw new Error('Unauthorized modification of data')
  }
  // get data to modify from body
  const { password } = req.body

  // find user
  const user = await User.findById(req.params.id)

  // hash new password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)

  // save user
  await user.save()
  res.status(200)
  res.json(user)
})

const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user.roles.includes('admin')) {
    res.status(401)
    throw new Error('Unauthorized, you need to be an admin')
  }

  const user = await User.findById(req.body.id)

  await user.delete()

  res.status(200).json({
    id: req.body.id
  })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}
