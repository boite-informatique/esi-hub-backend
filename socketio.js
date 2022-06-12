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

	io.on("connection", async (socket) => {
		try {
			console.log("############################")
			console.log(socket.handshake.headers.cookie)
			console.log("############################")

			// const tokenPayload = jwt.decode(socket.handshake.query.jwt)

			const tokenPayload = jwt.decode(
				cookie.parse(socket.handshake.headers.cookie).accessToken
			)
			console.log("user connected")
			// console.log('TOKEN PAYlooold : ', tokenPayload)

			const user = await User.findById(tokenPayload?.id)
				.select("name avatar")
				.populate("avatar")

			console.log("user", user.id, "payload", tokenPayload.id)
			socket.user = user._doc
			socket.emit("connected")
			socket.on("ready", async () => {
				///////OPEARTIONS AFTER CLIENT HAS CONNECTED
				const rooms = []
				await ChatRoom.find({
					participants: { $elemMatch: { $in: [user?._id] } },
				})
					.populate("participants", "name avatar")
					.cursor()
					.eachAsync(async (doc) => {
						doc._doc.messages = await ChatMessage.find({ room: doc.id })
							.populate("user", "name avatar")
							.sort({
								createdAt: 1,
							})
						rooms.push(doc)
					})

				const messages = await socket.emit("authorized", user)
				rooms.map((room) => socket.join(room._id.toString()))
				socket.emit("join-rooms", rooms)

				socket.on("new-message", async (msg) => {
					try {
						const message = await ChatMessage.create({
							body: msg.body,
							room: msg.room,
							user: socket.user._id,
						})
						console.log(msg.room.toString())
						console.log(socket.rooms)
						await message.populate("user", "name avatar")
						io.to(msg.room.toString()).emit("new-message", msg)
					} catch (err) {
						console.log("error new-message", err)
					}
				})

				socket.on("test", (msg) => {
					console.log(msg, "socket.sup:", socket.user)
				})

				//ROOM STUFF

				socket.on("create-room", async (room) => {
					try {
						members = room.participants.split(",").map((val) => val.trim())
						const queriedMembers = await (
							await User.find({ email: { $in: members } })
						).map((elem) => elem.id)

						queriedMembers.push(socket.user._id)
						room.participants = queriedMembers
						const newRoom = await ChatRoom.create(room)
						io.emit("new-room", {
							id: newRoom.id.toString(),
							participants: newRoom.participants,
						})
					} catch (err) {
						console.log("err create-room", err)
					}
				})

				socket.on("ask-join-room", async (room) => {
					try {
						if (!room.participants.find((val) => val == socket.user._id)) return
						socket.join(room.id)
						const roomQueried = await ChatRoom.findById(room.id).populate(
							"user",
							"name avatar"
						)
						roomQueried._doc.messages = []
						socket.emit("room-joined", roomQueried)
					} catch (err) {
						console.log("error ask-join-room", err)
					}
				})

				socket.on("joinRoom", (room) => {
					socket.join(room)
				})
				socket.on("message", (msg) => {
					io.to(msg.room).emit("chatMessage", msg)
				})
			})

			socket.on("disconnect", () => console.log("user disconnected"))
		} catch (err) {
			console.log("error has occured", err)
			socket.disconnect()
		}
	})
}
