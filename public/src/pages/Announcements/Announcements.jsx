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
	Checkbox,
	FormControlLabel
} from "@mui/material"
import axios from "../../axios"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import AnnouncementCard from "../../components/AnnouncementCard"
import { red, yellow } from "@mui/material/colors"
import { useEffect } from "react"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const TAGS = [
	{ t: "Important", C: "#F79C93" },
	{ t: "Club Event", C: "#5F6095" },
	{ t: "Administrative Announcement", C: "#efd345" },
	{ t: "Homework", C: "#79d0c1" },
	{ t: "Course Support", C: "#617ba7" },
	{ t: "Lost And Found", C: "#16825d" },
]

export default function Announcements() {
	const [query, setQuery] = useState({ tags: [], search: "", nolost : false })
	// const [tags, setTags] = useState("")
	// const [data, setData] = useState([])
	// const [refresh, setRefresh] = useState(false)
	// const [error, setError] = useState(null)

	const fetchAnnouncements = async (query) =>
		await axios.get(
			`/api/announcement/?limit=50&tags=${JSON.stringify(query.tags)}&s=${query.search}&nolost=${query.nolost}`,
			{
				withCredentials: true,
			}
		)
	const { data, error, status, refetch, failureCount, ...otherStuff } = useQuery(
		["announcements", query],
		() => fetchAnnouncements(query),
// 		{ enabled: false }
	)

	console.log({error, ...otherStuff}, data?.data?.data?.length)
	useEffect(() => {
		refetch()
	}, [])
	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			`/api/announcement/?limit=50&tags=${JSON.stringify(query.tags)}&s=${
	// 				query.search
	// 			}`
	// 		)
	// 		.then((res) => {
	// 			console.log(res.data.data)
	// 			setError(null)
	// 			setData(res.data.data)
	// 		})
	// 		.catch((err) => {
	// 			console.log("err fetching announcements", err)
	// 			setError(err)
	// 			setData([])
	// 		})
	// }, [])
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

	const handleNoLost = (event) => {
	  setQuery((prev) => ({...prev, nolost : event.target.checked}))
	}
	const handleFilterApply = () => {
		console.log("refresh")
		refetch()
		refetch()
		// setRefresh(!refresh)
	}

	const handleClearFIlter = () => {
		setQuery({ tags: [], search: "" })
		console.log("clear refresh")
		// setRefresh(!refresh)
		refetch()
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
							{status === "error" && (
								<Typography>No announcements found</Typography>
							)}
							{status === "success" &&
								data.data.data.map((announcement, index) => (
									<Grid item xs={12} key={index}>
										<AnnouncementCard data={announcement} key={index} />
									</Grid>
								))}

							{status === "loading" && <Typography>Loading ...</Typography>}

							{/* {error &&
								(error?.response?.status == 404 ? (
									<Typography>No Announcements found</Typography>
								) : (
									<Typography>Could not find any announcements</Typography>
								))} */}
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
								<FormControlLabel control={<Checkbox checked={query.nolost} onChange={handleNoLost} />} label="Disable announcements with Lost & Found tag" />
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
											>
												<Chip
													label={tag.t}
													icon={query.tags.includes(tag.t) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/>}
													sx={{backgroundColor : tag.C, }}
// 													variant={
// 														query.tags.includes(tag.t) ? "filled" : "outlined"
// 													}
													onClick={() => handleTag(tag.t)}
													variant="filled"
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
									{/*<Button
										variant="contained"
										fullWidth
										onClick={() => handleFilterApply()}
									>
										Apply filters
									</Button> */}
								</Grid>
							</Container>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}
