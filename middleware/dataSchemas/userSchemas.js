const joi = require('joi')

const options = {
  abortEarly: false,
  stripUnknown: true
}
const registerSchema = joi.object().keys({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(32).required()
}).options(options)

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(32).required()
}).options(options)

module.exports = {
  registerSchema,
  loginSchema
}
