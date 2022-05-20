import React from "react"
import sio from "socket.io-client"

const socket = sio("http://localhost:3005", {
	withCredentials: true,
})

socket.emit("sup")

function Chat() {
	return <div>Chat</div>
}

export default Chat
