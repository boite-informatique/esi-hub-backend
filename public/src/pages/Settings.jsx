import {
	Card,
	TextField,
	Modal,
	Box,
	Container,
	Button,
	Alert,
	Breadcrumbs,
	Typography,
	Avatar,
	CardContent,
	CardHeader,
	Stack,
	Chip,
} from "@mui/material"
import axios from "../axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AttachmentIcon from "@mui/icons-material/Attachment"
import EditIcon from "@mui/icons-material/Edit"

const Settings = () => {
	/*************************************** */
	// const hidePass = (S) => {
	// 	let F = ""
	// 	for (let i = 0; i < S.length; i++) {
	// 		F = F + "*"
	// 	}
	// 	return F
	// }
	/************************* */
	const [openPass, setOpenPass] = useState(false)
	const handleOpenPass = () => {
		setOpenPass(true)
	}
	const handleClosePass = () => {
		setOpenPass(false)
	}
	/************************* */
	const [openName, setOpenName] = useState(false)
	const handleOpenName = () => {
		setOpenName(true)
	}
	const handleCloseName = () => {
		setOpenName(false)
	}
	/************************* */
	const [openAvatar, setOpenAvatar] = useState(false)
	const handleOpenAvatar = () => {
		setOpenAvatar(true)
	}
	const handleCloseAvatar = () => {
		setOpenAvatar(false)
	}

	const [data, setData] = useState(null)
	const [error, setError] = useState(false)

	useEffect(() => {
		axios
			.get(`/api/user/current`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data)
				setData(res.data)
			})
			.catch((err) => setError(true))
	}, [])

	return (
		data && (
			<Container sx={{ marginLeft: "30%", width: "50%" }}>
				<Breadcrumbs sx={{ marginBottom: 2 }}></Breadcrumbs>
				<Card
					sx={{
						width: "80%",
						borderLeft: "solid 5px #0087a1",
						borderRight: "solid 5px #0087a1",
					}}
				>
					<Avatar
						alt={data.name}
						src={"/uploads/" + data.avatar.filename}
						sx={{ height: 96, width: 96, mx: "auto", my: 2 }}
					/>
					<Button
						onClick={handleOpenAvatar}
						component="span"
						sx={{ mx: "35%" }}
						align="center"
						startIcon={<EditIcon />}
					>
						Edit Avatar
					</Button>
					<EditAvatar
						data={data}
						open={openAvatar}
						handleClose={handleCloseAvatar}
					/>
					<Typography
						color="text.primary"
						sx={{
							padding: 2,
						}}
					>
						Name : {data.name}
						<Button
							onClick={handleOpenName}
							component="span"
							align="center"
							startIcon={<EditIcon />}
						>
							Edit
						</Button>
						<EditName
							data={data}
							open={openName}
							handleClose={handleCloseName}
						/>
					</Typography>
					<Typography
						color="text.primary"
						sx={{
							padding: 2,
						}}
					>
						Email : {data.email}
					</Typography>

					<Typography
						color="text.primary"
						sx={{
							padding: 2,
						}}
					>
						Password:{" "}
						{
							//hidePass(data.password)
							"*****"
						}
						<Button
							onClick={handleOpenPass}
							component="span"
							align="center"
							startIcon={<EditIcon />}
						>
							Edit
						</Button>
						<EditPass
							data={data}
							open={openPass}
							handleClose={handleClosePass}
						/>
					</Typography>
					<Typography
						color="text.primary"
						sx={{
							padding: 2,
						}}
					>
						Sexe: {data.sexe}
					</Typography>
					<Typography
						color="text.primary"
						sx={{
							padding: 2,
						}}
					>
						Groups :{" "}
						{data.groups.map((group, index) => (
							<Chip
								key={index}
								label={group.name}
								color="primary"
								variant="outlined"
								size="small"
							/>
						))}
					</Typography>
				</Card>
			</Container>
		)
	)
}
export default Settings

const EditName = ({ data, open, handleClose }) => {
	const style = {
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}
	/******************** */

	const [Name, setName] = useState()
	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})
	const handleSubmit = async () => {
		await axios
			.put(`/api/user/`, { name: Name })
			.then((res) => {
				if (res.data.error)
					setalert({ severity: "error", text: res.data.error })
				else
					setalert({ severity: "success", text: "Successfully changed name" })
			})
			.catch((err) =>
				setalert({
					severity: "error",
					text: error?.response?.error
						? error.response.error
						: "Error changing avatar",
				})
			)
	}
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
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								sx={{ padding: 2 }}
							>
								Edit Name
							</Typography>
							{alert.text !== "" && (
								<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
									{alert.text}
								</Alert>
							)}
							<TextField
								className="AddTaskCardTextInput"
								name="Task Title"
								label="Enter the New name"
								type="text"
								onChange={(e) => setName(e.target.value)}
								sx={{
									width: 300,
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 55,
								}}
							/>

							<Button
								variant="contained"
								onClick={handleSubmit}
								sx={{
									marginTop: 2,
									width: 200,
								}}
							>
								Edit
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}
/***************************************** */
const EditPass = ({ data, open, handleClose }) => {
	const style = {
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}
	/******************** */
	const [OldPass, setOldPass] = useState("")
	const [passA, setPassA] = useState("")
	const [passB, setPassB] = useState("")

	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const handleSubmit = async () => {
		if (passA !== passB) {
			setalert({ severity: "error", text: "New passwords don't match" })
			return
		}
		await axios
			.put(`/api/user/?old=` + OldPass, { password: passA })
			.then((res) => {
				if (res.data.error)
					setalert({ severity: "error", text: res.data.error })
				else
					setalert({
						severity: "success",
						text: "Successfully changed password",
					})
			})
			.catch((error) => {
				console.log(error)
				setalert({
					severity: "error",
					text: error?.response?.data?.error
						? error?.response?.data?.error
						: "Error changing password",
				})
			})
	}
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
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								sx={{ padding: 2 }}
							>
								Edit password
							</Typography>
							{alert.text !== "" && (
								<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
									{alert.text}
								</Alert>
							)}

							<TextField
								className="AddTaskCardTextInput"
								name="Task Title"
								label="Enter old password"
								type="password"
								value={OldPass}
								onChange={(e) => setOldPass(e.target.value)}
								sx={{
									width: 300,
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 55,
								}}
							/>
							<TextField
								className="AddTaskCardTextInput"
								name="Task Title"
								label="Enter new password"
								value={passA}
								type="password"
								onChange={(e) => setPassA(e.target.value)}
								sx={{
									width: 300,
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 55,
								}}
							/>
							<TextField
								className="AddTaskCardTextInput"
								name="Task Title"
								label="Confirm new password"
								type="password"
								value={passB}
								onChange={(e) => setPassB(e.target.value)}
								sx={{
									width: 300,
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 55,
								}}
							/>

							<Button
								variant="contained"
								onClick={handleSubmit}
								sx={{
									marginTop: 2,
									width: 200,
								}}
							>
								Edit
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}
/************************************Edit Avatar************************************************************* */
const EditAvatar = ({ data, open, handleClose }) => {
	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const style = {
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}

	const handleSubmit = async () => {
		console.log(file)
		let fd = new FormData()
		fd.append("avatar", file, file.name)
		fd.append("data", "{}")
		try {
			const res = await axios.put(`/api/user/avatar`, fd, {
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
					text: <Typography>Avatar changed</Typography>,
				})
			}
		} catch (error) {
			console.log(error)
			setalert({
				severity: "error",
				text: (
					<Typography>
						{error?.response?.data?.error
							? error?.response?.data?.error
							: "Error changing avatar"}
					</Typography>
				),
			})
		}
	}

	const [file, setFile] = useState(null)
	const handleFileChange = (event) => {
		setFile(event.target.files[0])
	}

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
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								sx={{ padding: 2 }}
							>
								Edit Avatar
							</Typography>
							{alert.text !== "" && (
								<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
									{alert.text}
								</Alert>
							)}
							<label htmlFor="upload-files">
								<input
									type="file"
									name="avatar"
									accept="image/*"
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

							<Button
								variant="contained"
								onClick={handleSubmit}
								sx={{
									marginTop: 2,
									width: 200,
								}}
							>
								Edit
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}
