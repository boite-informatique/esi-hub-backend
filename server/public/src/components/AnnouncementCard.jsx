import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

function AnnouncementCard(props) {
	return (
		<Card
			sx={{ height: 110, backgroundColor: "secondary" }}
			variant="outlined"
			{...props}
		>
			<CardHeader
				title={
					<Link
						to={"/announcements/" + props.data._id}
						style={{ textDecoration: "none" }}
					>
						<Typography color="text.primary">{props.data.title}</Typography>
					</Link>
				}
				avatar={
					<Avatar alt={props.data.user.name} src={props.data.user.avatar} />
				}
				subheader={"By : " + props.data.user.name}
				sx={{ mb: -2 }}
			/>

			<CardContent>
				<Typography variant="body2" gutterBottom>
					{props.data.body.length > 90
						? props.data.body.slice(90) + "..."
						: props.data.body}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default AnnouncementCard
