const socketio = require("socket.io")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")
const User = require("./models/userModel")
const ChatRoom = require("./models/chat/chatRoomModel")
const ChatMessage = require("./models/chat/chatMessageModel")

module.exports = (server) => {
	const io = socketio(server, {
		cors: {
			origin: ["http://localhost:3000"],
			methods: ["GET", "POST"],
			credentials: true,
		},
	})

	// io.engine.on("initial_headers", async (headers, req) => {
	// 	headers["set-cookie"] = cookie.serialize(
	// 		"cookie2",
	// 		"lol nchofo cookie customization wala la?",
	// 		{
	// 			path: "/",
	// 			maxAge: 60 * 30,
	// 		}
	// 	)
	// 	console.log("khasna cookies", cookie.parse(req.headers.cookie).accessToken)
	// })

	io.on("connection", (socket) => {
		// console.log("############################")
		// console.log(socket.handshake.headers.cookie)
		// console.log("############################")

		// const tokenPayload = jwt.decode(socket.handshake.query.jwt)

		const tokenPayload = jwt.decode(
			cookie.parse(socket.handshake.headers.cookie).accessToken
		)
		console.log("user connected")
		socket.emit("connected")
		// console.log('TOKEN PAYlooold : ', tokenPayload)

		// const user = await User.findById(tokenPayload?.id)
		// .select("name avatar")
		// .populate("avatar")
		//
		console.log("payload", tokenPayload.id)
		socket.user = { id: tokenPayload?.id.toString() }
		socket.emit("connected")
		socket.on("ready", async () => {
			///////OPEARTIONS AFTER CLIENT HAS CONNECTED
			const rooms = await ChatRoom.find({
				participants: { $elemMatch: { $in: [socket?.user?.id] } },
			}).populate("participants", "name avatar")
			// .cursor()
			// .eachAsync(async (doc) => {
			// 	doc._doc.messages = await ChatMessage.find({ room: doc.id })
			// 		.populate("user", "name avatar")
			// 		.sort({
			// 			createdAt: 1,
			// 		})
			// 	rooms.push(doc)
			// })

			rooms.map((room) => socket.join(room._id.toString()))
			socket.emit("join-rooms", rooms)
		})

		// GET MESSAGES OF CURRENT ROOM
		socket.on("room-messages", async (room) => {
			console.log("beep boop request room messages")
			try {
				const messages = await ChatMessage.find({ room })
					.populate("user", "name avatar")
					.sort({ createdAt: 1 })

				socket.emit("room-messages", {
					room,
					messages,
				})
			} catch (err) {
				console.log("room-messages error", err)
			}
		})

		// NEW MESSAGE ON OLD ROOM
		socket.on("new-message", async (msg) => {
			console.log("new message from", socket.user.id)
			try {
				const newMessage = await ChatMessage.create({
					body: msg.body,
					room: msg.room,
					user: socket.user.id,
				})
				await newMessage.populate("user", "name avatar")
				io.to(msg.room._id.toString()).emit("new-message-room", newMessage)
			} catch (err) {
				console.log("new-message error", err)
			}
		})

		// CREATE NEW ROOM THEN SEND ROOM INFO TO SOCKETS TO ASK TO JOIN
		socket.on("create-room", (room) => {
			console.log("i fired once", socket.id)

			members = room.participants.split(",").map((val) => val.trim())
			User.find({ email: { $in: members } })
				.then((res) => {
					res = res.map((elem) => elem.id)
					res.push(socket.user.id)
					room.participants = res
					ChatRoom.create(room)
						.then((room) => {
							io.emit("new-room", {
								id: room.id.toString(),
								participants: room.participants,
							})
						})
						.catch((err) => console.log("err create-room 1", err))
				})
				.catch((err) => console.log("err create-room 2"))
		})

		// emitted from client after receiving new-room event
		socket.on("ask-join-room", async (room) => {
			try {
				if (!room.participants.find((val) => val == socket.user.id)) return
				socket.join(room.id)
				const roomQueried = await ChatRoom.findById(room.id).populate(
					"participants",
					"name avatar"
				)
				roomQueried._doc.messages = []
				socket.emit("room-joined", roomQueried)
			} catch (err) {
				console.log("error ask-join-room", err)
			}
		})

		socket.on("disconnect", () => console.log("user disconnected"))
		socket.on("end", () => socket.disconnect())
	})
}
