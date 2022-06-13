import {
	Card,
	Container,
	Breadcrumbs,
	Typography,
	Avatar,
	CardContent,
	CardHeader,
	Stack,
	Chip,
} from "@mui/material"
import axios from "../axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function MyProfile() {
	/*************** */
	const { id } = useParams()

	const [data, setData] = useState(null)
	const [error, setError] = useState(false)

	useEffect(() => {
		axios
			.get(id ? `/api/user/${id}` : `/api/user/current`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data)
				setData(res.data)
			})
			.catch((err) => setError(true))
	}, [])

	return (
		<Container sx={{ marginLeft: "15%", width: "80%" }}>
			<Breadcrumbs sx={{ marginBottom: 2 }}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<Typography color="text.primary" underline="hover">
						Home
					</Typography>
				</Link>

				<Link to="/profile" style={{ textDecoration: "none" }}>
					<Typography color="text.primary" underline="hover">
						Profile
					</Typography>
				</Link>

				<Typography>{data && data.name}</Typography>
			</Breadcrumbs>
			<Card>
				{data && (
					<>
						<Avatar
							alt={data.name}
							src={"/uploads/" + data.avatar?.filename}
							sx={{
								height: 96,
								border: "solid 5px #0087a1",
								width: 96,
								mx: "auto",
								my: 2,
							}}
						/>
						<CardContent>
							<Typography
								sx={{
									textAlign: "center",
									fontSize: "30px",
									fontWeight: "bold",
								}}
							>
								{" "}
								{data.name}
							</Typography>
							<Typography
								sx={{
									textAlign: "center",
								}}
							>
								Email : {data.email}
							</Typography>
							{data.groups.length > 0 && (
								<Stack direction="row" spacing={0.7}>
									<Typography sx={{ display: "inline-block" }}>
										Groups :{" "}
									</Typography>
									{data.groups.map((group, index) => (
										<Chip
											key={index}
											label={group.name}
											color="primary"
											variant="outlined"
											size="small"
										/>
									))}
								</Stack>
							)}
						</CardContent>
					</>
				)}
			</Card>
		</Container>
	)
}

export default MyProfile
