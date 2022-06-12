const router = require("express").Router()
const c = require("../controllers/taskController")
const authorize = require("../middleware/authorize")

router.use(authorize)
router.get("/", c.getTaskAll)
router.get("/:id", c.getTaskId)
router.post("/", c.createTask)
router.put("/:id", c.updateTask)
router.delete("/:id", c.deleteTask)

module.exports = router
