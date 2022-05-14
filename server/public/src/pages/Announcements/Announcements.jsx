import { Add } from "@mui/icons-material"
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
import axios from "axios"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import AnnouncementCard from "../../components/AnnouncementCard"

const BASE_URL = "http://localhost:3005"
const TAGS = [
	"Important",
	"Club Event",
	"Administrative Announcement",
	"Homework",
	"Course Support",
	"Lost & Found",
	"Lost & Found : Resolved",
]

export default function Announcements() {
	const [tagFilter, setTagFilter] = useState([])
	const [query, setQuery] = useState({ tags: "", search: "" })

	const fetchAnnouncements = async () =>
		await axios.get(
			`${BASE_URL}/api/announcement/?tags=${query.tags}&search=${query.search}`,
			{
				withCredentials: true,
			}
		)
	const { data, error, status, refetch, ...other } = useQuery(
		"announcements",
		fetchAnnouncements
	)

	const navigate = useNavigate()

	const handleTag = (tag) => {
		tagFilter.includes(tag)
			? setTagFilter((prevState) => prevState.filter((val) => val !== tag))
			: setTagFilter((prevState) => [...prevState, tag])
	}

	const handleTagApply = () => {
		setQuery((prev) => ({ ...prev, tags: tagFilter.toString() }))
		console.log(tagFilter)
		refetch()
	}

	if (data) console.log("data ; ", data)
	return (
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
						{status === "error" && (
							<Alert severity="error">Error fetching announcements</Alert>
						)}

						{status === "loading" && <Typography>Loading ...</Typography>}

						{status === "success" &&
							data.data.data.map((announcement, index) => (
								<Grid item xs={12}>
									<AnnouncementCard data={announcement} key={index} />
								</Grid>
							))}
					</Grid>
				</Grid>
				<Grid item xs={4} zeroMinWidth>
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
							Filters
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
									<Chip
										key={index}
										label={tag}
										variant={tagFilter.includes(tag) ? "filled" : "outlined"}
										onClick={() => handleTag(tag)}
									/>
								))}
							</Grid>
							<Button
								variant="filled"
								fullWidth
								onClick={() => setTagFilter([])}
							>
								Clear filters
							</Button>
							<Button variant="contained" fullWidth onClick={handleTagApply}>
								Apply filters
							</Button>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</Container>
	)
}
