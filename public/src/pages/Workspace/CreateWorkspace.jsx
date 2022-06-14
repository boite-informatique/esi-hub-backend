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
import axios from "../../axios"
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
import { Link } from "react-router-dom"
const CreateWorkspace = ({ open, handleClose }) => {
	const style = {
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		borderRadius: "10px",
		boxShadow: 24,
		p: 4,
	}
	/**************************** */
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((values) => ({ ...values, [name]: value }))
	}

	/**************************** */
	const [alert, setAlert] = useState({
		severity: "",
		text: "",
	})
	const handleSubmit = async () => {
		setAlert("")
		try {
			const res = await axios.post(
				`/api/workspace`,
				{
					...formData,
					members: [],
				},
				{ withCredentials: true }
			)
			if (res.data.error) {
				setAlert({
					severity: "error",
					text: <Typography>{res.data.error}</Typography>,
				})
			} else {
				setAlert({
					severity: "success",
					text: (
						<Typography>
							Workspace created,{" "}
							<Link
								to={"/workspaces/" + res.data?._id}
								style={{ textDecoration: "none" }}
							>
								Visit Workspace
							</Link>
						</Typography>
					),
				})
			}
		} catch (error) {
			console.log(error)
			setAlert({
				severity: "error",
				text: (
					<Typography>
						{error?.response?.error
							? error.response.error
							: "Error creating workspace"}
					</Typography>
				),
			})
		}
	}
	/*:::::::::::::::::::::::::::::::::::::::::::
     
  
  }


      /**************************** */

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
								Create New WorkSpace
							</Typography>
							{alert.text !== "" && (
								<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
									{alert.text}
								</Alert>
							)}
							<TextField
								className="AddTaskCardTextInput"
								name="name"
								label="WorkSpace Name"
								type="text"
								value={formData.name}
								onChange={handleChange}
								sx={{
									width: 300,
									bgcolor: "white",
									marginLeft: 2,
									borderRadius: 2,
									marginBottom: 2,
									marginTop: 2,
									height: 55,
								}}
								required
							/>
							<TextField
								className="AddTaskCardTextInput"
								name="description"
								label="Workspace description"
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
								required
							/>

							<Button
								onClick={() => handleSubmit()}
								type="submit"
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
export default CreateWorkspace
