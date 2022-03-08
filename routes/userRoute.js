const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers
} = require('../controllers/userController')
const { registerSchema, loginSchema, updateSchema } = require('../middleware/dataSchemas/userSchemas')
const dataValidator = require('../middleware/dataValidation')
const authorize = require('../middleware/authorize')

router.post('/register', dataValidator(registerSchema), registerUser)

router.post('/login', dataValidator(loginSchema), loginUser)

router.route('/:id').put(authorize, dataValidator(updateSchema), updateUser).delete(authorize, deleteUser)

router.get('/', getUsers)
module.exports = router
