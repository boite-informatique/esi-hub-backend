const joi = require('joi')

const options = {
  abortEarly: false,
  stripUnknown: true
}
const registerSchema = joi.object().keys({
  name: joi.string().min(3).max(30).required().trim(),
  email: joi.string().email().required().lowercase().trim(),
  password: joi.string().min(6).max(32).required(),
  groups : joi.array().items(joi.string()).default([])
}).options(options)

const loginSchema = joi.object().keys({
  email: joi.string().email().required().lowercase().trim(),
  password: joi.string().min(6).max(32).required()
}).options(options)

const updateSchema = joi.object().keys({
  email: joi.string().email().default('').lowercase().trim(),
  name: joi.string().min(3).max(30).default('').trim(),
  password: joi.string().min(6).max(32).default(''),
  groups : joi.array().items(joi.string()).default([])
}).options(options)

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema
}
