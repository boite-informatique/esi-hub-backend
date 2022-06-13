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
	Paper,
} from "@mui/material"
import React, { useRef } from "react"
import { useState } from "react"
import imgFirst from "/assets/chat.svg"
import sio from "socket.io-client"
import { useEffect } from "react"
import { useContext } from "react"
import io from "socket.io-client"

// const socket = sio("http://localhost:3005", {
// 	withCredentials: true,
// 	// query: {
// 	// 	jwt: Cookies.get("accessToken"),
// 	// },
// })

let socket

export default function Chat() {
	const [connected, setConnected] = useState(false)

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
	const [currentRoom, setCurrentRoom] = useState(null)
	const [newMessage, setNewMessage] = useState("")
	const [messages, setMessages] = useState([])
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const messagesEndRef = useRef(null)
	const [createRoomData, setCreateRoomData] = useState({
		name: "",
		participants: "",
	})

	useEffect(() => {
		// socket = io("http://localhost:3005", { withCredentials: true })
		socket = io({ withCredentials: true })

		socket.on("connected", () => {
			setConnected(true)
			socket.emit("ready")

			socket.on("join-rooms", (rooms) => {
				setRooms(rooms)
				///////////
				/////////

				socket.on("new-room", (room) => socket.emit("ask-join-room", room))
				socket.on("room-joined", (room) => setRooms([...rooms, room]))
			})

			socket.on("room-messages", (messages) => {
				console.log("got your messages bro", messages)
				setMessages(messages.messages)
				scrollToBottom()
			})

			return () => {
				socket.disconnect()
			}
		})
	}, [])

	useEffect(() => {
		scrollToBottom()
		if (currentRoom) {
			socket.emit("room-messages", currentRoom)
			socket.on("new-message-room", (msg) => {
				console.log("new message arrived before !")
				console.log(currentRoom)
				if (!currentRoom) return
				console.log("new message arrived middle !")
				console.log(msg.room == currentRoom._id)
				if (msg.room == currentRoom._id) {
					console.log("new message arrived !")
					setMessages((prev) => [...prev, msg])
					scrollToBottom()
				}
			})
		}
		console.log("current room", currentRoom)
		scrollToBottom()
	}, [currentRoom])

	const handleChange = (event) => {
		const { name, value } = event.target
		setCreateRoomData((values) => ({ ...values, [name]: value }))
	}
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView()
	}

	const handleNewMessage = () => {
		console.log("new message firing once")
		if (!newMessage.trim()) return
		socket.emit("new-message", {
			room: currentRoom,
			body: newMessage.trim(),
		})
		setNewMessage("")
	}
	const handleCreateRoom = () => {
		console.log("i fired once")
		socket.emit("create-room", createRoomData)
		setCreateRoomData({ name: "", participants: "" })
		handleClose()
	}

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
					<Button
						variant="contained"
						fullWidth
						onClick={() => handleCreateRoom()}
					>
						Create New Room
					</Button>
				</Box>
			</Modal>
			<Grid container sx={{ ml: "200px" }}>
				<Paper sx={{ maxHeight: 400, minWidth: 250 }}>
					<Grid item xs={3}>
						<Grid container>
							<List sx={{ maxHeight: 400, minWidth: 250 }}>
								<ListItem
									secondaryAction={
										<IconButton edge="end" onClick={() => handleOpen()}>
											<Add />
										</IconButton>
									}
								>
									<ListItemText
										primary={<Typography variant="h5">Your rooms</Typography>}
									/>
								</ListItem>
								<Divider />
								{rooms.length > 0 && (
									<List
										sx={{ height: "100%", overflow: "scroll", maxHeight: 330 }}
									>
										{rooms.map((room, index) => (
											<ListItemRoom
												room={room}
												key={index}
												setRoom={setCurrentRoom}
											/>
										))}
									</List>
								)}
								{rooms.length === 0 && (
									<Typography marginLeft={3}>No rooms found</Typography>
								)}
							</List>
						</Grid>
					</Grid>
				</Paper>
				{currentRoom && (
					<>
						<Grid item xs={5} sx={{ minHeight: "80%" }}>
							<Container fixed>
								<Paper
									sx={{
										maxHeight: 400,
										minHeight: 400,
										minWidth: 500,
										position: "relative",
									}}
								>
									<List sx={{ maxHeight: 320, overflowY: "scroll" }}>
										{messages.length > 0 &&
											messages.map((message, index) => (
												<Message data={message} key={index} />
											))}
										<div ref={messagesEndRef} />
									</List>
									<Grid
										container
										gap={1}
										sx={{ position: "absolute", bottom: 10, left: 10 }}
									>
										<TextField
											type="text"
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											sx={{ height: 5 }}
										/>
										<Button
											variant="contained"
											sx={{ height: 50 }}
											onClick={() => handleNewMessage()}
										>
											Send
										</Button>
									</Grid>
								</Paper>
							</Container>
						</Grid>
						<Grid item xs={4}>
							<Paper sx={{ minHeight: 400, maxHeight: 400, maxWidth: 250 }}>
								<List sx={{ maxHeight: 400, overflowY: "scroll" }}>
									{currentRoom.participants.map((participant, index) => (
										<Participant data={participant} key={index} />
									))}
								</List>
							</Paper>
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

function ListItemRoom({ room, setRoom }) {
	return (
		<ListItem disablePadding>
			<ListItemButton
				onClick={() => {
					console.log("room to be set", room)
					setRoom(room)
				}}
			>
				<ListItemText primary={room.name} />
			</ListItemButton>
		</ListItem>
	)
}

function Message({ data }) {
	return (
		data && (
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
