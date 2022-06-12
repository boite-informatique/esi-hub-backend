const socketio = require("socket.io")
const cookie = require("cookie")
const jwt = require('jsonwebtoken')
const User = require('./models/userModel')
const ChatRoom = require('./models/chat/chatRoomModel')


module.exports = (server) => {
	const io = socketio(server, {
		cors: {
			origin: ["http://localhost:3000"],
			methods: ["GET", "POST"],
			credentials: true,
		},
	})

	// io.engine.on("initial_headers", (headers, req) => {
	// 	// headers["set-cookie"] = cookie.serialize(
	// 	// 	"cookie2",
	// 	// 	"lol nchofo cookie customization wala la?",
	// 	// 	{
	// 	// 		path: "/",
	// 	// 		maxAge: 60 * 30,
	// 	// 	}
	// 	// )
	// 	console.log("khasna cookies", req.headers.cookie)
	// })

	io.on("connection", async (socket) => {
		const tokenPayload = jwt.decode(socket.handshake.query.jwt)
		console.log("user connected")

		// console.log('TOKEN PAYlooold : ', tokenPayload)

		const user = await User.findById(tokenPayload?.id).select('name avatar').populate('avatar')

		const rooms = await ChatRoom.find({participants : {$elemMatch : {$in : [user?._id]}}}).populate('participants')

		socket.emit('authorized', user)
		rooms.map(room => socket.join(room._id))
		socket.emit("join-rooms", rooms)
		
		socket.on("message", (msg) => {
			console.log(msg)
		})
		
		//ROOM STUFF

		socket.on('create-room', async (data) => {
			console.log('test stuff', data)
			const {room, user} = data
			room.participants = room.participants.split(',')
			room.participants.forEach(async (element, index, array) => {
				const user = await User.findOne({email : element})
				if (!user) return
				array[index] = user._id
			});
			room.participants.push(user._id)
			const newRoom = await ChatRoom.create(room)
		})

		socket.on("joinRoom", (room) => {
			socket.join(room)
		})
		socket.on("message", (msg) => {
			io.to(msg.room).emit("chatMessage", msg)
		})

		socket.on("disconnect", () => console.log("user disconnected"))
	})
}
