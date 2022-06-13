const router = require("express").Router()
const expressAsyncHandler = require("express-async-handler")
const c = require("../controllers/taskController")
const authorize = require("../middleware/authorize")
const ChatRoom = require("../models/chat/chatRoomModel")

router.get(
	"/",
	authorize,
	expressAsyncHandler(async (req, res) => {
		const rooms = await ChatRoom.find({
			participants: { $elemMatch: { $in: [req.user.id] } },
		})
			.sort({ createdAt: -1 })
			.limit(6)

		if (rooms.length === 0) {
			res.status(404)
			throw new Error("No rooms found")
		}

		res.status(200).json(rooms)
	})
)

module.exports = router
