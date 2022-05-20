const socketio = require("socket.io")
const cookie = require("cookie")

module.exports = (server) => {
	const io = socketio(server, {
		cors: {
			origin: ["http://localhost:3000"],
			methods: ["GET", "POST"],
			credentials: true,
		},
	})

	io.engine.on("initial_headers", (headers, req) => {
		// headers["set-cookie"] = cookie.serialize(
		// 	"cookie2",
		// 	"lol nchofo cookie customization wala la?",
		// 	{
		// 		path: "/",
		// 		maxAge: 60 * 30,
		// 	}
		// )
		console.log(headers)
	})

	io.on("connection", (socket) => {
		console.log("user connected", cookie.parse(socket.handshake.headers.cookie))

		socket.on("joinRoom", (room) => {
			socket.join(room)
		})
		socket.on("message", (msg) => {
			io.to(msg.room).emit("chatMessage", msg)
		})

		socket.on("disconnect", () => console.log("user disconnected"))
	})
}
