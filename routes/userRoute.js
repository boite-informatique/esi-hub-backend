const router = require('express').Router();
const {
    registerUser,
    loginUser,
    updateUser
} = require('../controllers/userController');
const { registerSchema, loginSchema } = require('../middleware/dataSchemas/userSchemas');
const dataValidator = require('../middleware/dataValidation');
const authorize = require('../middleware/authorize');

router.post('/register', dataValidator(registerSchema), registerUser)

router.post('/login', dataValidator(loginSchema), loginUser)

router.get('/', (req, res) => {
    res.send(req.headers.authorization)
})

router.put('/:id', authorize, updateUser);

module.exports = router