const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} = require('../controllers/userController')
const { registerSchema, loginSchema } = require('../middleware/dataSchemas/userSchemas')
const dataValidator = require('../middleware/dataValidation')
const authorize = require('../middleware/authorize')

router.post('/register', dataValidator(registerSchema), registerUser)

router.post('/login', dataValidator(loginSchema), loginUser)

router.route('/:id').put(authorize, updateUser).delete(authorize, deleteUser)
module.exports = router
