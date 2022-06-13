import { Add } from "@mui/icons-material"
import "./Announcements.css"
import {
	Alert,
	Container,
	Typography,
	Grid,
	Breadcrumbs,
	Box,
	Stack,
	Chip,
	Button,
	TextField,
} from "@mui/material"
import axios from "../../axios"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import AnnouncementCard from "../../components/AnnouncementCard"
import { red, yellow } from "@mui/material/colors"

const TAGS = [
	{ t: "Important", C: "#F79C93" },
	{ t: "Club Event", C: "#5F6095" },
	{ t: "Administrative Announcement", C: "#efd345" },
	{ t: "Homework", C: "#79d0c1" },
	{ t: "Course Support", C: "#617ba7" },
	{ t: "Lost & Found", C: "#16825d" },
	{ t: "Lost & Found : Resolved", C: "#c98f09" },
]

export default function Announcements() {
	const [query, setQuery] = useState({ tags: [], search: "" })
	// const [tags, setTags] = useState("")

	const fetchAnnouncements = async () =>
		await axios.get(
			`/api/announcement/?limit=50&tags=${JSON.stringify(query.tags)}&s=${
				query.search
			}`,
			{
				withCredentials: true,
			}
		)
	const { data, error, status, refetch, isFetching } = useQuery(
		"announcements",
		fetchAnnouncements
	)

	const navigate = useNavigate()

	const handleTag = (tag) => {
		query.tags.includes(tag)
			? setQuery((prevState) => ({
					...prevState,
					["tags"]: prevState.tags.filter((val) => val !== tag),
			  }))
			: setQuery((prevState) => ({
					...prevState,
					["tags"]: [...prevState.tags, tag],
			  }))
		console.log(query.tags)
	}

	const handleFilterApply = () => {
		refetch()
	}

	const handleClearFIlter = () => {
		setQuery({ tags: [], search: "" })
		refetch()
	}

	return (
		<div className="AnnouncementContainer">
			<Container>
				<Breadcrumbs sx={{ marginBottom: 2 }}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography color="text.primary" underline="hover">
							Home
						</Typography>
					</Link>

					<Typography color="text.primary" underline="hover">
						Announcements
					</Typography>
				</Breadcrumbs>
				<Grid container gap={3} wrap="nowrap">
					<Grid item xs={8}>
						<Grid container gap={2}>
							{status === "success" &&
								data.data.data.map((announcement, index) => (
									<Grid item xs={12} key={index}>
										<AnnouncementCard data={announcement} key={index} />
									</Grid>
								))}

							{status === "loading" && <Typography>Loading ...</Typography>}

							{status === "error" && (
								<Typography>No Announcements found</Typography>
							)}
						</Grid>
					</Grid>

					<Grid item xs={4} zeroMinWidth>
						<div className="AnnouncementSCard">
							<Container sx={{ position: "sticky", top: "5rem" }}>
								<Button
									onClick={() => navigate("create")}
									sx={{ mb: 2 }}
									startIcon={<Add />}
									fullWidth
								>
									Create an Announcement
								</Button>
								<Typography variant="h5" mb={2}>
									Filters :
								</Typography>
								<Grid container gap={1}>
									<TextField
										label="Search"
										type="text"
										variant="filled"
										onChange={(e) =>
											setQuery((prev) => ({ ...prev, search: e.target.value }))
										}
										value={query.search}
										fullWidth
									/>
									<Grid container gap={1}>
										<Typography variant="subtitle1">Tags : </Typography>
										{TAGS.map((tag, index) => (
											<div
												key={index}
												className="Tag"
												style={{ backgroundColor: tag.C }}
											>
												<Chip
													label={tag.t}
													variant={
														query.tags.includes(tag.t) ? "filled" : "outlined"
													}
													onClick={() => handleTag(tag.t)}
												/>
											</div>
										))}
									</Grid>
									<Button
										variant="filled"
										fullWidth
										onClick={() => {
											handleClearFIlter()
										}}
									>
										Clear filters
									</Button>
									<Button
										variant="contained"
										fullWidth
										onClick={() => handleFilterApply}
									>
										Apply filters
									</Button>
								</Grid>
							</Container>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}
