import React, { useState } from "react"
import "./Losts.css"
import axios from "../axios"
import InfoIcon from "@mui/icons-material/Info"
import { useQuery } from "react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
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
	ListItemIcon,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material"

const Losts = ({ open, handleClose }) => {
	const fetchAnnouncements = async () =>
		await axios.get(`/api/announcement?tags=["Lost And Found"]`, {
			withCredentials: true,
		})
	const { data, error, status } = useQuery("lostAnnouncements", fetchAnnouncements)

	const style = {
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		height: 500,
		bgcolor: "white",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}
	let navigate = useNavigate()
  console.log(data)
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
							variant="h5"
							component="h1"
							sx={{ fontWeight: "bold" }}
						>
							<div className="LostsTitle"> Lost & Found</div>
						</Typography>
						<div className="lostsC">
							<div className="">
								{error && <Typography>No Lost & Found announcements found</Typography>}
								{data?.data?.data &&
									data.data.data.map((announcement, index) => (
										<LostCard data={announcement} key={index} handleClose={handleClose} />
									))}

							</div>
						</div>
					</Box>
				</Modal>
			)}
		</div>
	)
}

const LostCard = ({ data, handleClose }) => {
  const navigate = useNavigate()
	const VisitLost = () => {
		navigate(`/announcements/${data._id}`)
	}
	return (
	  <ListItem>
				<ListItemButton onClick={() => {
				  VisitLost()
				  handleClose()
				}}>
					<ListItemIcon>
						<InfoIcon />
					</ListItemIcon>
					<ListItemText primary={data.title} secondary={"by : " + data.user.name} />
				</ListItemButton>
			</ListItem>
	)
}

export default Losts
