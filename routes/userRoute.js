const router = require('express').Router();
const { checkPreferences } = require('joi');
const {
    registerUser,
    loginUser
} = require('../controllers/userController');
const { registerSchema, loginSchema } = require('../middleware/dataSchemas/userSchemas');

const dataValidator = require('../middleware/dataValidation');
router.post('/register', dataValidator(registerSchema), registerUser)

router.post('/login', dataValidator(loginSchema), loginUser)

router.get('/', (req, res) => {
    res.send(req.headers.authorization)
})

module.exports = router