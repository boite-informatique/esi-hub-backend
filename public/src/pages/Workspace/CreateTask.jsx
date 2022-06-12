import React, { useState } from "react"
import "./Workspace.css"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import { Workspaces } from "@mui/icons-material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PersonIcon from "@mui/icons-material/Person"
import DoneIcon from "@mui/icons-material/Done"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import {
	Select,
	TextField,
	MenuItem,
	FormControl,
	Alert,
	InputLabel,
} from "@mui/material"
import { bgcolor, width } from "@mui/system"
import axios from "axios"
import { useParams } from "react-router-dom"

const CreateTask = ({ open, handleClose }) => {
	const { id } = useParams()
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		textAlign: "center",
		transform: "translate(-50%, -50%)",
		borderRadius: "10px",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}
	/**************************** */
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		workspace: id,
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((values) => ({ ...values, [name]: value }))
	}
	/**************************** */
	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const handleSubmit = async () => {
		axios
			.post(`http://localhost:3005/api/task/`, formData, {
				withCredentials: true,
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.log("err"))
	}
	/*:::::::::::::::::::::::::::::::::::::::::::*/

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
								Create new Task
							</Typography>

							<TextField
								name="name"
								label="Task Title"
								multiline
								value={formData.name}
								type="text"
								onChange={handleChange}
								sx={{
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 55,
									width: 300,
								}}
							/>
							<TextField
								name="description"
								label="Task Discription"
								multiline
								type="text"
								value={formData.description}
								onChange={handleChange}
								sx={{
									width: 300,
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 95,
								}}
							/>

							<Button
								onClick={() => handleSubmit()}
								variant="contained"
								sx={{
									width: 200,
								}}
							>
								ADD
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}

export default CreateTask
