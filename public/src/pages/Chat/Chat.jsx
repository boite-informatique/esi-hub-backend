import { Add, AttachEmail } from "@mui/icons-material"
import {
	Avatar,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Modal,
	Box,
	TextField,
	Button,
	Container,
} from "@mui/material"
import React from "react"
import { useState } from "react"
import imgFirst from "/assets/chat.svg"
import sio from "socket.io-client"
import { useEffect } from "react"

// const socket = sio("http://localhost:3005", {
// 	withCredentials: true,
// 	// query: {
// 	// 	jwt: Cookies.get("accessToken"),
// 	// },
// })

export default function Chat() {
	// const { socket, rooms, setRooms } = useContext(SocketContext)
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}
	const [rooms, setRooms] = useState([])
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const [createRoomData, setCreateRoomData] = useState({
		name: "",
		participants: "",
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setCreateRoomData((values) => ({ ...values, [name]: value }))
	}

	const [newMessage, setNewMessage] = useState("")
	const handleNewMessage = (event) => {
		event.preventDefault()
		if (!newMessage.trim()) return
		socket.emit("new-message", {
			room: currentRoom,
			body: newMessage.trim(),
		})
		setNewMessage("")
	}
	const [currentRoom, setCurrentRoom] = useState(null)
	const handleCreateRoom = () => {
		socket.emit("create-room", createRoomData)
		setCreateRoomData({ name: "", participants: "" })
		handleClose()
	}
	useEffect(() => {
		socket.on("connected", () => {
			socket.emit("ready")

			socket.on("join-rooms", (rooms) => {
				setRooms(rooms)
				///////////
				socket.on("new-message", (msg) => {
					let roomArr = rooms
					const i = roomArr.findIndex((val) => val._id == msg.room)
					console.log(i, roomArr, rooms)
					roomArr[i].messages.push(msg)
					setRooms(roomArr)
				})
				/////////

				socket.on("new-room", (room) => socket.emit("ask-join-room", room))
				socket.on("room-joined", (room) => setRooms([...rooms, room]))
			})
		})
	})
	const user = [
		{
			name: "Mohamed",
			avatar:
				"https://media.discordapp.net/attachments/553250258587484182/974380998999564418/unknown.png?width=376&height=376",
		},
	]
	const messages = [
		{
			body: "hello world",
			user: {
				name: "Mohamed",
				avatar:
					"https://media.discordapp.net/attachments/553250258587484182/974380998999564418/unknown.png?width=376&height=376",
			},
		},
	]
	const handleAddRoom = () => {}

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Create new chat room
					</Typography>
					<TextField
						label="Name"
						type="text"
						name="name"
						variant="filled"
						onChange={handleChange}
						value={createRoomData.name}
						fullWidth
					/>
					<TextField
						label="Add Friends"
						name="participants"
						type="text"
						variant="filled"
						onChange={handleChange}
						value={createRoomData.participants}
						fullWidth
					/>
					<Button variant="contained" fullWidth onClick={handleCreateRoom}>
						Create New Room
					</Button>
				</Box>
			</Modal>
			<Grid container sx={{ ml: "200px" }}>
				<Grid item xs={3}>
					<Grid container>
						<List>
							<ListItem
								secondaryAction={
									<IconButton edge="end" onClick={() => handleOpen()}>
										<Add />
									</IconButton>
								}
							>
								<ListItemText primary="Your Rooms" />
							</ListItem>
							{rooms.length > 0 && (
								<List sx={{ height: "100%" }}>
									{rooms.map((room, index) => (
										<ListItemRoom
											name={room.name}
											id={room._id}
											key={index}
											setRoom={setCurrentRoom}
										/>
									))}
								</List>
							)}
							{rooms.length === 0 && <Typography>No rooms found</Typography>}
						</List>
					</Grid>
				</Grid>
				{currentRoom !== null && (
					<>
						<Grid item xs={5} sx={{ height: "1000" }}>
							<Container fixed>
								<List sx={{ height: "100%", overflowY: "scroll" }}>
									{rooms
										.find((val) => val._id == currentRoom)
										.messages.map((message, index) => (
											<Message data={message} key={index} />
										))}
								</List>
								<form
									onSubmit={handleNewMessage}
									style={{
										display: "flex",
										marginTop: "10",
										alignItems: "center",
									}}
								>
									<Grid container gap={1}>
										<TextField
											type="text"
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											sx={{ height: 6 }}
										/>
										<Button
											type="submit"
											variant="contained"
											sx={{ height: 50 }}
										>
											Send
										</Button>
									</Grid>
								</form>
							</Container>
						</Grid>
						<Grid item xs={4}>
							{rooms
								.find((val) => val._id == currentRoom)
								.participants.map((participant, index) => (
									<Participant data={participant} key={index} />
								))}
						</Grid>
					</>
				)}
				{currentRoom === null && (
					<Grid item xs={5}>
						<img src={imgFirst} height="100%" />
					</Grid>
				)}
			</Grid>
		</>
	)
}

function ListItemRoom({ name, id, setRoom }) {
	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => setRoom(id)}>
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	)
}

function Message({ data }) {
	console.log(data)
	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt={data.user.name || "username"} src={data.user.avatar} />
			</ListItemAvatar>
			<ListItemText
				primary={data.user.name}
				secondary={
					<Typography
						sx={{ display: "inline" }}
						component="span"
						variant="body2"
						color="text.primary"
					>
						{data.body}
					</Typography>
				}
			/>
		</ListItem>
	)
}

function Participant({ data }) {
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar alt={data.name} src={data.avatar} />
			</ListItemAvatar>
			<ListItemText primary={data.name} />
		</ListItem>
	)
}
