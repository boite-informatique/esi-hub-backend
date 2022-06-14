import React, { useState } from "react"
import "./Workspace.css"

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
	Grid,
} from "@mui/material"
import { bgcolor, width } from "@mui/system"
import axios from "../../axios"
const CreateMember = ({ Ws, open, handleClose }) => {
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
	const [members, setMembers] = useState("")
	const handleSubmit = () => {
		console.log("hello", Ws)
		axios
			.put(
				`/api/workspace/${Ws._id}/?members=${members}`,
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log("added members", res.data)
				window.location.reload()
			})
			.catch((err) => {
				console.log("err")
				window.location.reload()
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
							<Grid container gap={1}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Add Members To The Team
								</Typography>

								<Typography variant="body2">
									Add emails separated by comma ','
								</Typography>
								<TextField
									className="AddTaskCardTextInput"
									name="username"
									label="Member Name"
									type="text"
									multiline
									fullWidth
									sx={{ marginY: 2 }}
									value={members}
									onChange={(e) => setMembers(e.target.value)}
								/>
								<Button
									type="submit"
									variant="contained"
									fullWidth
									onClick={() => handleSubmit()}
								>
									ADD
								</Button>
							</Grid>
						</Box>
					</Modal>
				</div>
			)}
		</>
	)
}
export default CreateMember
