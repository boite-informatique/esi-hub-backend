// import packages
const express = require("express")
const http = require("http")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/errorHandler")
const path = require("path")

// initialize server
const app = express()

const server = http.createServer(app)
require("dotenv").config() // use environmental variables
require("./db")() // connect to database
require("./socketio")(server) // use socket.io

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
)
app.use(cookieParser())

// routes
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/announcement", require("./routes/announceRoute"))
app.use("/api/workspace", require("./routes/workspaceRoute.js"))
app.use("/api/task", require("./routes/taskRoute.js"))
app.use("/api/group", require("./routes/groupRoute"))
app.use("/api/forum", require("./routes/forumRoute.js"))
app.use("/api/comment", require("./routes/commentRoute.js"))
app.use("/api/room", require("./routes/roomRoute.js"))

// error handling
app.use(errorHandler)

app.get("/uploads/:file", function (req, res) {
	res.sendFile(path.join(__dirname + "/public/uploads/" + req.params.file))
})

app.use(express.static(path.join(__dirname, "./public/dist")))
// unknown routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/dist/index.html"))
})

// server port
const PORT = process.env.PORT || 3000
server.listen(PORT, () =>
	console.log(`server running on http://localhost:${PORT}`)
)
