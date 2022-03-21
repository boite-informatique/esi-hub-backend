const router = require('express').Router()
const c = require('../controllers/userController')
const { registerSchema, loginSchema, updateSchema } = require('../middleware/dataSchemas/userSchemas')
const dataValidator = require('../middleware/dataValidation')
const authorize = require('../middleware/authorize')

router.post('/register', dataValidator(registerSchema), c.registerUser)
router.post('/login', dataValidator(loginSchema), c.loginUser)
router.put('/:id', authorize, dataValidator(updateSchema), c.updateUser)
router.delete('/:id', authorize, c.deleteUser)
router.get('/', c.getUsers)
router.get('/current', authorize, c.getCurrentUser)
module.exports = router
