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
} from "@mui/material"

const Losts = ({ open, handleClose }) => {
	const fetchAnnouncements = async () =>
		await axios.get(`/api/announcement?lost=4`, {
			withCredentials: true,
		})
	const { data, error, status } = useQuery("announcements", fetchAnnouncements)

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
								{status === "sucecss" &&
									data.data.data.map((announcement, index) => (
										<LostCard data={announcement} key={index} />
									))}
							</div>
						</div>
					</Box>
				</Modal>
			)}
		</div>
	)
}

const LostCard = ({ data }) => {
	const VisitLost = () => {
		navigate(`/announcements/${data._id}`)
	}
	return (
		<div className="LostCard" onClick={() => VisitLost()}>
			<div className="LostCard1">
				<div className="LostCardLogo">
					<InfoIcon />{" "}
				</div>
				<div className="LostCardTitle">{data.title}</div>
			</div>
			<div className="LostCard2">by : {data.user.name}</div>
		</div>
	)
}

export default Losts
