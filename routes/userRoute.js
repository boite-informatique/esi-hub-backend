const router = require("express").Router()
const c = require("../controllers/userController")
const {
	registerSchema,
	loginSchema,
	updateSchema,
} = require("../middleware/dataSchemas/userSchemas")
const dataValidator = require("../middleware/dataValidation")
const authorize = require("../middleware/authorize")
const { upload, uploadController } = require("../utilities/fileUpload")

router.put(
	"/avatar",
	authorize,
	upload.array("avatar", 1),
	uploadController,
	c.changeAvatar
)
router.post("/register", dataValidator(registerSchema), c.registerUser)
router.post("/login", dataValidator(loginSchema), c.loginUser)
router.put("/", authorize, dataValidator(updateSchema), c.updateUser)
router.put("/:id", authorize, dataValidator(updateSchema), c.updateUser)
router.delete("/:id", authorize, c.deleteUser)
router.get("/logout", authorize, c.logout)
router.get("/current", authorize, c.getCurrentUser)

// verify account
router.get("/verifyAccount/:token", c.verifyAccount)
router.post("/verifyAccount", c.verifyAccountSend)
router.get("/:id", authorize, c.getUserById)
module.exports = router
