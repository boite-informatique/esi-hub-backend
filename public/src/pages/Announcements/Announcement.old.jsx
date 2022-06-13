import { Image } from "@mui/icons-material"
import {
	Avatar,
	Breadcrumbs,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Container,
	Stack,
	Typography,
	Modal,
	Box,
	Grid,
} from "@mui/material"
import axios from "../../axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Announcement() {
	const { id } = useParams()
	const [imageModal, setImageModal] = useState({})
	const [data, setData] = useState(null)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		maxHeight: 400,
		maxWidth: 400,
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	}

	const handleCloseModal = () => setImageModal({})

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
					<Card>
						<CardHeader
							avatar={<Avatar alt={data.user.name} src={data.user.avatar} />}
							title={data.title}
							subheader={"by : " + data.user.name}
						/>
						<CardContent>
							<Typography variant="body2">{data.body}</Typography>

							{data.attachments && data.attachments.length > 0 && (
								<Stack direction="row" spacing={0.7} sx={{ marginTop: 2 }}>
									<Typography variant="subtitle2">Attachments :</Typography>
									{data.attachments.map((file, index) => (
										// add onClick event
										<Chip
											key={index}
											label={file.filename.substring(0, 20)}
											//onClick={() => setImageModal(file)}
											onClick={() => navigate("/uploads/" + file.filename)}
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
						</CardContent>
					</Card>
				)}

				{error === true && (
					<Typography>
						Error fetching the announcement or the announcement doesnt exist
					</Typography>
				)}
			</Container>
			<Modal open={imageModal.path ? true : false} onClose={handleCloseModal}>
				<Box sx={style}>
					<Grid
						container
						alignItems="center"
						justify="center"
						direction="column"
						gap={3}
					>
						<Typography>{imageModal && imageModal.filename}</Typography>
						<img
							alt={imageModal && imageModal.filename}
							src={"/uploads/" + imageModal.filename}
							style={{ objectFit: "contain", maxWidth: 400, maxHeight: 300 }}
						/>
					</Grid>
				</Box>
			</Modal>
		</div>
	)
}

export default Announcement
