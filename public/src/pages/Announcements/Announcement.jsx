import { Image } from "@mui/icons-material"

import {
	Avatar,
	Breadcrumbs,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography,
	Modal,
	Box,
	Grid,
	TextField,
	Select,
	FormControl,
	InputLabel,
	Button,
	Alert,
} from "@mui/material"
import axios from "../../axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined"
import { AuthContext } from "../../AuthProvider"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

function Announcement() {
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
			navigate("/announcements")
		} catch (err) {
			console.log("error delete", err)
		}
	}
	const [openMA, setOpenMA] = useState(false)
	const handleCloseMA = () => {
		setOpenMA(false)
		console.log("hhhh MA")
	}

	const { auth } = useContext(AuthContext)

	const { id } = useParams()
	const [data, setData] = useState(null)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(`/api/announcement/${id}`, { withCredentials: true })
			.then((res) => {
				console.log(res.data)
				res.data.createdAt = new Date(res.data.createdAt)
				setData(res.data)
			})
			.catch((err) => setError(true))
	}, [])

	return (
		<div>
			<Container sx={{ ml: "200px" }}>
				<Breadcrumbs sx={{ marginBottom: 2 }}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography color="text.primary" underline="hover">
							Home
						</Typography>
					</Link>

					<Link to="/announcements" style={{ textDecoration: "none" }}>
						<Typography color="text.primary" underline="hover">
							Announcements
						</Typography>
					</Link>

					<Typography>{data && data.title}</Typography>
				</Breadcrumbs>
				{data !== null && (
					<Card sx={{ maxWidth: "95%" }}>
						<CardHeader
							avatar={<Avatar alt={data.user.name} src={data.user.avatar} />}
							title={data.title}
							subheader={"by : " + data.user.name}
							action={
								auth.info._id == data.user._id ? (
									<IconButton onClick={handleClick}>
										<MoreVertOutlinedIcon />
									</IconButton>
								) : null
							}
						/>
						<ACMenu
							anchorEl={anchorEl}
							open={open}
							handleClose={handleClose}
							EditeAnnounce={() => EditeAnnounce(data._id)}
							DeleteAnnounce={() => DeleteAnnounce(data._id)}
						/>
						<CardContent sx={{ maxWidth: "95%" }}>
							<Typography variant="body2" sx={{ overflow: "clip" }}>
								{data.body}
							</Typography>
							{data.attachments && data.attachments.length > 0 && (
								<Stack direction="row" spacing={0.7} sx={{ marginTop: 2 }}>
									<Typography variant="subtitle2">Attachments :</Typography>
									{data.attachments.map((file, index) => (
										// add onClick event
										<Chip
											key={index}
											label={file.name}
											onClick={() => navigate(file.path)}
											color="primary"
											variant="outlined"
											size="small"
											icon={<Image />}
										/>
									))}
								</Stack>
							)}

							{data.tags && data.tags.length > 0 && (
								<Stack direction="row" spacing={0.7} sx={{ marginTop: 2 }}>
									<Typography variant="subtitle2">Tags :</Typography>
									{data.tags.map((tag, index) => (
										<Chip
											key={index}
											label={tag}
											color="primary"
											variant="outlined"
											size="small"
										/>
									))}
								</Stack>
							)}

							{data.visibility && (
								<Stack direction="row" spacing={0.7} sx={{ marginTop: 2 }}>
									<Typography variant="subtitle2">Visibility :</Typography>
									{data.visibility.length === 0 && (
										<Typography vairant="subtitle2" sx={{ fontSize: 14 }}>
											{" "}
											All
										</Typography>
									)}
									{data.visibility.length > 0 &&
										data.visibility.map((group, index) => (
											<Chip
												key={index}
												label={group.name}
												color="primary"
												variant="outlined"
												size="small"
											/>
										))}
								</Stack>
							)}
						</CardContent>
					</Card>
				)}

				{data && (
					<ModifyAnnouncement
						open={openMA}
						handleClose={handleCloseMA}
						data={data}
					/>
				)}

				{error === true && (
					<Typography>
						Error fetching the announcement or the announcement doesnt exist
					</Typography>
				)}
			</Container>
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
					text: <Typography>Announcement modified</Typography>,
				})
				window.location.reload()
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

export default Announcement
