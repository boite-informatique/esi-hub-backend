import { Avatar, Card, CardContent, CardHeader } from "@mui/material"
import React, { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined"
import AttachmentIcon from "@mui/icons-material/Attachment"
import {
	Alert,
	Container,
	Typography,
	Grid,
	Breadcrumbs,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Button,
	Modal,
	Box,
	Input,
} from "@mui/material"

import { styled, alpha } from "@mui/material/styles"

import Menu from "@mui/material/Menu"

import EditIcon from "@mui/icons-material/Edit"

import DeleteIcon from "@mui/icons-material/Delete"
import { useContext } from "react"
import { AuthContext } from "../AuthProvider"
import axios from "../axios"

function AnnouncementCard({ data }) {
	const { auth } = useContext(AuthContext)

	const color = (user) => {
		let color
		switch (user) {
			case "Alphabit":
				color = "#4096d1"
				break
			case "Ingeniums":
				color = "#101012"
				break
			case "ObjetPerdu":
				color = "#ffb900"
				break
			default:
				color = "#ab2f78"
		}
		return color
	}
	/******************* */
	let navigate = useNavigate()

	const handleopenProfil = () => {
		navigate(`/profile/${data.user._id}`)
	}
	/************************ */
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const EditeAnnounce = (id) => {
		console.log(id)
		setAnchorEl(null)
		setOpenMA(true)
	}
	const DeleteAnnounce = async (id) => {
		try {
			await axios.delete("/api/announcement/" + id)
			setAnchorEl(null)
			window.location.reload()
		} catch (err) {
			console.log("error delete", err)
		}
	}
	const [openMA, setOpenMA] = useState(false)
	const handleCloseMA = () => {
		setOpenMA(false)
		console.log("hhhh MA")
	}
	return (
		<div
			className="AnnouncementCard"
			style={{ borderLeftColor: color(data.user.name) }}
		>
			<div className="CardHeader " style={{ display: "flex" }}>
				<CardHeader
					title={
						<Link to={"/announcements/" + data._id}>
							<Typography color="text.primary">{data.title}</Typography>
						</Link>
					}
					avatar={
						<Avatar
							alt={data.user.name}
							src={data.user.avatar}
							sx={{ cursor: "pointer" }}
							onClick={handleopenProfil}
						/>
					}
					subheader={
						<Link to={"/profile/" + data.user._id}>
							<Typography color="gray">{"By: " + data.user.name}</Typography>
						</Link>
					}
					sx={{ mb: -2, width: "93%" }}
				/>
				{auth.info._id == data.user._id && (
					<MoreVertOutlinedIcon
						onClick={handleClick}
						sx={{ marginTop: 3, cursor: "pointer" }}
					/>
				)}
			</div>
			<ACMenu
				anchorEl={anchorEl}
				open={open}
				handleClose={handleClose}
				EditeAnnounce={() => EditeAnnounce(data._id)}
				DeleteAnnounce={() => DeleteAnnounce(data._id)}
			/>
			<CardContent>
				<Typography variant="body2" gutterBottom>
					{data.body.length < 90 ? data.body : <ViewMore data={data} />}
				</Typography>
			</CardContent>

			<ModifyAnnouncement
				open={openMA}
				handleClose={handleCloseMA}
				data={data}
			/>
		</div>
	)
}
const ViewMore = ({ data }) => {
	return (
		<div>
			{data.body.slice(0, 50) + "..."}
			<br />
			<a href={"/announcements/" + data._id} className="View-more">
				view more
			</a>
		</div>
	)
}
const ACMenu = ({
	anchorEl,
	open,
	handleClose,
	EditeAnnounce,
	DeleteAnnounce,
}) => {
	return (
		<div>
			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={EditeAnnounce} disableRipple>
					<EditIcon />
					Edit
				</MenuItem>
				<MenuItem onClick={DeleteAnnounce} disableRipple>
					<DeleteIcon />
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}

const ModifyAnnouncement = ({ open, handleClose, data }) => {
	const tags = [
		"Important",
		"Club Event",
		"Administrative Announcement",
		"Homework",
		"Course Support",
		"Lost & Found",
		"Lost & Found : Resolved",
	]
	const style = {
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 600,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}
	const [formData, setFormData] = useState({
		title: data.title,
		body: data.body,
		tags: data.tags,
		visibility: data.visibility,
	})

	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((values) => ({ ...values, [name]: value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const res = await axios.put(
				`http://localhost:3005/api/announcement/` + data._id,
				formData
			)
			if (res.data.error) {
				setalert({
					severity: "error",
					text: <Typography>{res.data.error}</Typography>,
				})
			} else {
				setalert({
					severity: "success",
					text: (
						<Typography>
							Announcement modified,{" "}
							<Link
								to={"/announcements/" + data._id}
								style={{ textDecoration: "none" }}
							>
								Visit Annoucement
							</Link>
						</Typography>
					),
				})
			}
		} catch (error) {
			console.log(error)
			setalert({
				severity: "error",
				text: (
					<Typography>
						{error?.response?.error
							? error.response.error
							: "Error modifying announcement"}
					</Typography>
				),
			})
		}
	}
	return (
		<div>
			{open && (
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
							sx={{ padding: 2 }}
						>
							Edit the Announcement
						</Typography>

						<form className="CreateAnnouncementForm" onSubmit={handleSubmit}>
							<Grid container gap={2} direction="column" justify="center">
								{alert.text !== "" && (
									<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
										{alert.text}
									</Alert>
								)}
								<TextField
									name="body"
									label="Body"
									multiline
									rows={4}
									variant="filled"
									onChange={handleChange}
									value={formData.body}
									required
								/>
								<FormControl variant="standard" component="div">
									<InputLabel id="select-tags" sx={{ pl: 1.5 }}>
										Tags
									</InputLabel>
									<Select
										name="tags"
										variant="filled"
										labelId="select-tags"
										multiple
										value={formData.tags}
										onChange={handleChange}
										label="Tags"
										sx={{ maxWidth: 400, overflowX: "hidden" }}
									>
										{tags.map((tag, index) => (
											<MenuItem key={index} value={tag}>
												{tag}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<Button type="submit" variant="contained">
									Modify
								</Button>
							</Grid>
						</form>
					</Box>
				</Modal>
			)}
		</div>
	)
}
export default AnnouncementCard
