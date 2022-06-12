// import socketio from "socket.io-client"
// import { createContext, useState } from "react"

// export const socket = socketio.connect("http://localhost:3005", {
// 	withCredentials: true,
// })
// export const SocketContext = createContext()

// export const SocketProvider = ({ children }) => {
// 	const [rooms, setRooms] = useState([])

// 	return (
// 		<SocketContext.Provider value={{ rooms, setRooms, socket }}>
// 			{children}
// 		</SocketContext.Provider>
// 	)
// }
