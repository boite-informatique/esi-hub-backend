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
	Box,
} from "@mui/material"
import "./Announcements.css"
import AttachmentIcon from "@mui/icons-material/Attachment"
import axios from "../../axios"
import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { borderColor } from "@mui/system"
import GroupList from "../../components/GroupList"
import groupJson from "../../components/groups.json"
import { useEffect } from "react"

export default function CreateAnnouncement() {
	const [groups, setGroups] = useState([])

	useEffect(() => {
		axios
			.get("/api/group", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data)
				setGroups(res.data)
			})
			.catch((err) => console.log("error has occured", err.response))
	}, [])

	const tags = [
		"Important",
		"Club Event",
		"Administrative Announcement",
		"Homework",
		"Course Support",
		"Lost And Found",
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

	const [checked, setChecked] = useState([])
	const [files, setFiles] = useState([])

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((values) => ({ ...values, [name]: value }))
	}

	const handleFileChange = (event) => {
		setFiles(event.target.files)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		let data = formData
		data.visibility = checked
		let fd = new FormData()
		for (const file of files) {
			fd.append("attachments", file, file.name)
		}

		// if (file) fd.append("avatar", file, file.name)
		fd.append("data", JSON.stringify(data))

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
						{groups.length > 0 && (
							<Box>
								<Typography>
									Visibility (Choose none for a public announcement)
								</Typography>
								<GroupList
									data={groups}
									checked={checked}
									setChecked={setChecked}
								/>
							</Box>
						)}
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
