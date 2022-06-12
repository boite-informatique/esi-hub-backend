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
	Input,
} from "@mui/material"
import "./Announcements.css"
import AttachmentIcon from "@mui/icons-material/Attachment"
import axios from "../../axios"
import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { borderColor } from "@mui/system"

export default function CreateAnnouncement() {
	const tags = [
		"Important",
		"Club Event",
		"Administrative Announcement",
		"Homework",
		"Course Support",
		"Lost & Found",
		"Lost & Found : Resolved",
	]

	const [formData, setFormData] = useState({
		title: "",
		body: "",
		tags: [],
		visibility: [],
	})

	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const [file, setFile] = useState(null)

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((values) => ({ ...values, [name]: value }))
	}

	const handleFileChange = (event) => {
		setFile(event.target.files[0])
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		let fd = new FormData()
		if (file) fd.append("avatar", file, file.name)
		fd.append("data", JSON.stringify(formData))

		try {
			const res = await axios.post(`/api/announcement/`, fd, {
				withCredentials: true,
				headers: { "content-type": "multipart/form-data" },
			})
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
							Announcement created,{" "}
							<Link
								to={"/announcements/" + res.data?._id}
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
							: "Error creating announcement"}
					</Typography>
				),
			})
		}
	}

	return (
		<div className="CreateAnnouncementContainer">
			<Container align="center">
				<Breadcrumbs sx={{ marginBottom: 2 }}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography color="text.primary">Home</Typography>
					</Link>

					<Link to="/announcements" style={{ textDecoration: "none" }}>
						<Typography color="text.primary">Announcements</Typography>
					</Link>

					<Typography>Create an Announcement</Typography>
				</Breadcrumbs>

				<form className="CreateAnnouncementForm" onSubmit={handleSubmit}>
					<Grid
						container
						gap={2}
						direction="column"
						sx={{ maxWidth: "45%" }}
						justify="center"
					>
						<Typography variant="h5">Create an Announcement</Typography>
						{alert.text !== "" && (
							<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
								{alert.text}
							</Alert>
						)}
						<TextField
							color="warning"
							focused
							name="title"
							label="Title"
							type="text"
							variant="filled"
							onChange={handleChange}
							value={formData.title}
							required
						/>
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
								label="Tags n shit LO"
							>
								{tags.map((tag, index) => (
									<MenuItem key={index} value={tag}>
										{tag}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<label htmlFor="upload-files">
							<input
								type="file"
								name="upload-files"
								multiple="multiple"
								id="upload-files"
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>
							<Button
								color="#AB2F78"
								variant="filled"
								component="span"
								align="center"
								startIcon={<AttachmentIcon />}
							>
								Upload File(s)
							</Button>
						</label>
						<Button type="submit" variant="contained">
							Create
						</Button>
					</Grid>
				</form>
			</Container>
		</div>
	)
}
