import { Announcement, Forum, Workspaces } from "@mui/icons-material"
import { RightBar } from "../../components/RightBar"
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
import axios from "../../axios"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

function Home() {
	const navigate = useNavigate()

	const fetchAnnouncements = async () =>
		await axios.get(`/api/announcement?limit=4`, {
			withCredentials: true,
		})
	const { data, error, status } = useQuery("announcements", fetchAnnouncements)

	const fetchWorkspaces = async () =>
		await axios.get(`/api/workspace?limit=6`, {
			withCredentials: true,
		})
	const {
		data: dataWorkspace,
		error: errorWorkspace,
		status: statusWorkspace,
	} = useQuery("workspaces", fetchWorkspaces)

	const fetchRooms = async () =>
		await axios.get(`/api/room`, {
			withCredentials: true,
		})
	const {
		data: dataRoom,
		error: errorRoom,
		status: statusRoom,
	} = useQuery("rooms", fetchRooms)

	if (status === "sucesss") console.log("success", data.data)
	return (
		<div style={{ height: "100%" }}>
			<div className="Home">
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card
							sx={{ height: "100%", bgcolor: "#dddbdb", borderRadius: "10px" }}
						>
							<CardHeader title="Recent Announcements" />
							<CardContent>
								<List>
									{status === "success" &&
										data.data.data.map((announcement, index) => (
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
						<Card
							sx={{ height: "100%", bgcolor: "#d0c9c0", borderRadius: "10px" }}
						>
							<CardHeader title="Recent Active Chat Rooms" />
							<CardContent>
								{/* <List>
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
								</List> */}
								<List>
									{statusRoom === "success" &&
										dataRoom.data.map((room, index) => (
											<ListItemRoom
												name={room.name}
												key={index}
												action={""}
												onClick={() => navigate("/chat/")}
											/>
										))}
									{errorRoom && errorRoom?.response?.status === 404 && (
										<Typography>No Rooms Found</Typography>
									)}
								</List>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={4}>
						<Card
							sx={{ height: "100%", bgcolor: "#B8B8B8", borderRadius: "10px" }}
						>
							<CardHeader title="Recently Created Workspaces" />
							<CardContent>
								<List>
									{statusWorkspace === "success" &&
										dataWorkspace.data.map((workspace, index) => (
											<ListItemWorkspace
												name={workspace.name}
												key={index}
												action={""}
												onClick={() => navigate("/workspaces/" + workspace._id)}
											/>
										))}
									{errorWorkspace &&
										errorWorkspace?.response?.status === 404 && (
											<Typography>No Workspaces found</Typography>
										)}
								</List>
								{/* <ListItemWorkspace
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
								/> */}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

function CardAnnouncement(props) {
	return (
		<div className="CardAnnouncement ">
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
		</div>
	)
}

function ListItemRoom({ name, action, ...props }) {
	return (
		<div className="ListItemRoom ">
			<ListItem disablePadding {...props}>
				<ListItemButton>
					<ListItemIcon>
						<Forum />
					</ListItemIcon>
					<ListItemText primary={name} secondary={action} />
				</ListItemButton>
			</ListItem>
		</div>
	)
}

function ListItemWorkspace({ name, click, action, ...props }) {
	return (
		<div className="ListItemWorkspace ">
			<ListItem disablePadding {...props}>
				<ListItemButton>
					<ListItemIcon>
						<Workspaces />
					</ListItemIcon>
					<ListItemText primary={name} secondary={action} />
				</ListItemButton>
			</ListItem>
		</div>
	)
}

function ListItemAnnouncement({ name, action, ...props }) {
	return (
		<div className="ListItemAnnouncement C">
			<ListItem disablePadding {...props}>
				<ListItemButton>
					<ListItemIcon>
						<Announcement />
					</ListItemIcon>
					<ListItemText primary={name} secondary={action} />
				</ListItemButton>
			</ListItem>
		</div>
	)
}
export default Home
