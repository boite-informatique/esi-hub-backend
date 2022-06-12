import { Announcement, Forum, Workspaces } from "@mui/icons-material"
import { RightBar } from "../components/RightBar"
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	Typography,
	ListItemButton,
	ListItemText,
} from "@mui/material"
import React from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

function Home() {
	const fetchAnnouncements = async () =>
		await axios.get(`http://localhost:3005/api/announcement?limit=4`, {
			withCredentials: true,
		})
	const { data, error, status } = useQuery("announcements", fetchAnnouncements)

	const navigate = useNavigate()

	return (
		<>
			<RightBar />
			<div className="Home">
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card sx={{ height: "100%" }}>
							<CardHeader title="Recent Announcements" />
							<CardContent>
								<List>
									{status === "success" &&
										data.data.map((announcement, index) => (
											<ListItemAnnouncement
												name={announcement.title}
												key={index}
												action={"by : " + announcement.user.name}
												onClick={() =>
													navigate("/announcements/" + announcement._id)
												}
											/>
										))}
									{error && error?.response?.status === 404 && (
										<Typography>No announcements found</Typography>
									)}
								</List>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={4}>
						<Card sx={{ height: "100%" }}>
							<CardHeader title="Recent Active Chat Rooms" />
							<CardContent>
								<List>
									<ListItemRoom
										name="2CP G4 Promo 2020"
										action="Mohamed : Lorem ipsum dolor sit amet."
									/>
									<ListItemRoom
										name="Alphabit"
										action="Chakib : Lorem ipsum dolor sit."
									/>
									<ListItemRoom
										name="python workshop"
										action="Brahmine : Lorem ipsum dolor sit amet."
									/>
								</List>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={4}>
						<Card sx={{ height: "100%" }}>
							<CardHeader title="Recent Workspace activity" />
							<CardContent>
								<ListItemWorkspace
									name="Project 1"
									action="Chakib started task 2"
								/>
								<ListItemWorkspace
									name="Project 1"
									action="Chakib finished task 1"
								/>
								<ListItemWorkspace
									name="Competition prep"
									action="Mohamed created new workspace"
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		</>
	)
}

function CardAnnouncement(props) {
	return (
		<Card {...props}>
			<CardHeader
				title={props.data.title}
				avatar={
					<Avatar alt={props.data.user.name} src={props.data.user.avatar} />
				}
				subheader={"by : " + props.data.user.name}
			/>
			<CardContent>
				<Typography variant="body2">{props.data.body}</Typography>
			</CardContent>
		</Card>
	)
}

function ListItemRoom({ name, action }) {
	return (
		<ListItem disablePadding>
			<ListItemButton>
				<ListItemIcon>
					<Forum />
				</ListItemIcon>
				<ListItemText primary={name} secondary={action} />
			</ListItemButton>
		</ListItem>
	)
}

function ListItemWorkspace({ name, action }) {
	return (
		<ListItem disablePadding>
			<ListItemButton>
				<ListItemIcon>
					<Workspaces />
				</ListItemIcon>
				<ListItemText primary={name} secondary={action} />
			</ListItemButton>
		</ListItem>
	)
}

function ListItemAnnouncement({ name, action, ...props }) {
	return (
		<ListItem disablePadding {...props}>
			<ListItemButton>
				<ListItemIcon>
					<Announcement />
				</ListItemIcon>
				<ListItemText primary={name} secondary={action} />
			</ListItemButton>
		</ListItem>
	)
}
export default Home
