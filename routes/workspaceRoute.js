const router = require("express").Router()
const c = require("../controllers/workspaceController")
const authorize = require("../middleware/authorize")

router.use(authorize)
router.get("/", c.getWorkspaceAll)
router.get("/:id", c.getWorkspaceId)
router.post("/", c.createWorkspace)
router.put("/:id", c.updateWorkspace)
router.delete("/:id", c.deleteWorkspace)

module.exports = router
