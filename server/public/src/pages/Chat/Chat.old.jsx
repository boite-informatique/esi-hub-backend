import React, { useState } from "react"
import { SidebarClose, SidebarOpen } from "../../components/Sections"
import TopBar from "../../components/TopBar"
import "./Chat.css"
import ChatOnline from "./chatOnline/ChatOnline"
import Conversation from "./Conversation/Conversation"
import Message from "./Message/Message"
import { RiAddCircleFill } from "react-icons/ri"
import { Navigate } from "react-router-dom"
import img from "/assets/miloudiz.jpg"
import img2 from "/assets/amine.jpg"
import img3 from "/assets/logoHome.png"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import sio from "socket.io-client"
import Cookies from "js-cookie"
import { useEffect } from "react"

var socket = sio("http://localhost:3005", {
	withCredentials: true,
	query: {
		jwt: Cookies.get("accessToken"),
	},
})

function Chat() {
	useEffect(() => {
		socket.emit("test", "hello")
	})
	const [usersRoom, setUsersRoom] = useState([])
	const [users, setUsers] = useState([
		{ id: 0, name: "user1", avatar: img3 },
		{ id: 1, name: "users2", avatar: img2 },
		{ id: 3, name: "user3", avatar: img },
	])
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
	const [messages, setMessages] = useState([
		{ id: 0, body: "salam", avatar: img },
		{ id: 1, body: "salam", avatar: img2 },
		{ id: 3, body: "çava khayi?", avatar: img2 },
	])

	const [conversations, setconversations] = useState([
		{ id: 0, name: "salam", avatar: img3 },
		{ id: 1, name: "zo3ama", avatar: img2 },
		{ id: 3, name: "perfecto", avatar: img },
	])

	const [chatsOnline, setChatsOnline] = useState([
		{ id: 0, name: "amine", avatar: img },
		{ id: 1, name: "moahmed", avatar: img2 },
		{ id: 3, name: "chakib", avatar: img3 },
	])
	const [nameRoom, setNameRoom] = useState("")
	const [myMessage, setMyMessage] = useState("")
	const [open, setOpen] = useState(false)
	const [newMessage, setNewMessage] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const addNewMessage = (msg) => {
		setMessages([...messages, msg])
	}

	const handleClick = () => {
		setMessages([...messages, { body: myMessage, avatar: img }])
		document.getElementById("btn").value = ""
	}

	const handleAddConversation = () => {
		setconversations([
			...conversations,
			{ id: 8, name: nameRoom, avatar: img3 },
		])
		setOpen(false)
	}

	const handleSearch = () => {}

	return (
		<>
			<div className="messenger">
				{open && (
					<div>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Add friends
								</Typography>

								<input
									placeholder="Search for friends"
									className="chatMenuInputt"
									onClick={handleSearch}
								/>

								<span></span>
								<br />
								<button
									className="chatSubmitButtonn"
									onClick={handleAddConversation}
								>
									Add{" "}
								</button>
							</Box>
						</Modal>
					</div>
				)}
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							placeholder="Search for friends"
							className="chatMenuInput"
						></input>
						<button className="plusIcon" onClick={() => setOpen(true)}>
							<RiAddCircleFill style={{ fontSize: "2em" }} />
						</button>

						{conversations.map((cnvr, index) => (
							<Conversation name={cnvr.name} key={index} avatar={cnvr.avatar} />
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						<div className="chatBoxTop">
							{messages.map((msg, index) => (
								<Message avatar={msg.avatar} key={index} body={msg.body} />
							))}
						</div>
						<div className="chatBoxBottom">
							<textarea
								className="chatMessageInput"
								placeholder="write something..."
								onChange={(e) => {
									setMyMessage(e.currentTarget.value)
								}}
								id="btn"
							></textarea>
							<button className="chatSubmitButton" onClick={handleClick}>
								{" "}
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Chat
