import React, { useState } from "react"
import "./firstPageChat.css"
import Conversation from "../Conversation/Conversation"
import img2 from "/assets/chat.svg"
import { RiAddCircleFill } from "react-icons/ri"
import img from "/assets/miloudiz.jpg"
import { useNavigate } from "react-router-dom"
import { Modal, Box, Typography } from "@mui/material"

const FirstPageChat = () => {
	const [rooms, setRooms] = useState([
		{ name: "room1" },
		{ name: "room2" },
		{ name: "room3" },
	])
	const navigate = useNavigate()

	const handleClick = () => {
		navigate("/chat/chat_id")
	}
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

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const [open, setOpen] = useState(false)

	const handleSearch = () => {}
	const handleAddRooms = () => {
		setRooms([...rooms, { id: 8, name: nameRoom, avatar: img }])
		setOpen(false)
	}
	const [nameRoom, setNameRoom] = useState("")
	return (
		<>
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
								Create new chat room
							</Typography>
							<input
								placeholder="Name"
								className="chatMenuInputt"
								onChange={(e) => {
									setNameRoom(e.currentTarget.value)
								}}
							/>
							<input
								placeholder="Search for friends"
								className="chatMenuInputt"
								onClick={handleSearch}
							/>

							<span></span>
							<br />
							<button className="chatSubmitButtonn" onClick={handleAddRooms}>
								Add{" "}
							</button>
						</Box>
					</Modal>
				</div>
			)}
			<div className="messengers">
				<div className="chatMenuu">
					<div className="div">
						<h1>Rooms :</h1>
						<span>
							<RiAddCircleFill
								style={{ fontSize: "2em" }}
								onClick={() => setOpen(true)}
							/>
						</span>
					</div>

					<div className="conversations">
						{rooms.map((room, index) => (
							<Conversation
								key={index}
								name={room.name}
								handleClick={handleClick}
								avatar={img}
							/>
						))}
					</div>
				</div>
				<div className="imgChat">
					<img src={img2}></img>
				</div>
			</div>
		</>
	)
}

export default FirstPageChat
