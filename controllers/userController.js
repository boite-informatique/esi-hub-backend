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
    id: user._id,
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
  res.cookie('token', generateToken(user._id), { httpOnly: true, sameSite: true })
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    groups: user.groups
  })
})

const updateUser = asyncHandler(async (req, res) => {
  // verify if the user is authorized to modify users
  const isAdmin = req.user.groups.includes('admin')

  if (req.params.id !== req.user._id && !isAdmin) {
    res.status(401)
    throw new Error('Unauthorized operation, you have to login as target user or admin')
  }
  // get data from request body
  const { body } = req

  // find user
  const user = await User.findById(req.params.id)

  // strip role modification if not admin
  body.groups = isAdmin ? body.groups : null

  // hash password if new password is set
  if (body.password) {
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password, salt)
  }

  // save user
  for (const key in user) {
    if (body[key]) {
      user[key] = body[key]
    }
  }

  await user.save()
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    groups: user.groups
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user.groups.includes('admin')) {
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
