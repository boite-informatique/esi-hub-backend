import React, { useState } from "react"
import "./Workspace.css"
import axios from "axios"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import {
	Select,
	TextField,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material"
import { bgcolor, width } from "@mui/system"
export const DeleteTask = ({ id, open, handleClose }) => {
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
	const handleSubmit = async ({ id }) => {
		await axios
			.delete(`http://localhost:3005/api/task/${id}`, { withCredentials: true })
			.then((res) => {
				console.log(" deleted", res.data)
				handleClose()
			})
			.catch((err) => console.log("err"))
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
								DO you wanna delete this task ,
							</Typography>

							<Button
								onClick={handleSubmit({ id })}
								variant="contained"
								sx={{
									width: 100,
									marginLeft: 6,
								}}
							>
								Yes
							</Button>

							<Button
								onClick={handleClose}
								variant="contained"
								sx={{
									width: 100,
									marginLeft: 5,
								}}
							>
								No
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}

/*-------------------------------------------*/

export const DeleteWs = ({ open, handleClose, id }) => {
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

	const handleSubmit = async (id) => {
		console.log("submit id", id)
		await axios
			.delete(`http://localhost:3005/api/workspace/${id}`, {
				withCredentials: true,
			})
			.then((res) => handleClose())
			.catch((err) => console.log("err"))
	}
	//::::::::::::::::::::::::::::*/

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
								DO you wanna delete this WorkSpace ?
							</Typography>

							<Button
								onClick={() => handleSubmit(id)}
								variant="contained"
								sx={{
									width: 100,
									marginLeft: 6,
								}}
							>
								Yes
							</Button>

							<Button
								onClick={handleClose}
								variant="contained"
								sx={{
									width: 100,
									marginLeft: 5,
								}}
							>
								No
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}
