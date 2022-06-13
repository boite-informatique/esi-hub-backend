import React, { useState, useEffect } from "react"
import "./Workspace.css"
import axios from "../../axios"
import { Add } from "@mui/icons-material"
import { useQuery } from "react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import "./CreateMember"
import { Typography, Button, Breadcrumbs } from "@mui/material"
import { WsBoard } from "./WsBoard"
import CreateMember from "./CreateMember"

function Workspace() {
	const { id } = useParams()
	// const [data, setData] = useState(null)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const getWorkspace = async () =>
		await axios.get(`/api/workspace/${id}`, {
			withCredentials: true,
		})

	const { data, status, refetch } = useQuery("workspace", getWorkspace)
	// useEffect(() => {
	// 	axios
	// 		.get(`http://localhost:3005/api/workspace/${id}`, {
	// 			withCredentials: true,
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data)
	// 			res.data.createdAt = new Date(res.data.createdAt)
	// 			setData(res.data)
	// 		})
	// 		.catch((err) => setError(true))
	// }, [])

	/***************************/

	/****************** */

	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	/************************ */

	return (
		<>
			{status === "success" && (
				<div className="Workspace">
					<WsBoard tasks={data.data.tasks} />
					<div className="ToolBar">
						<div className="ToolBarHeader">
							{" "}
							<div className="WorkSpaceTitle">{data.data.name}</div>
						</div>
						<div className="ToolBarC"></div>
						<div className="ToolBarCdescription">
							<div className="ToolBarCtitle"> Workspace description</div>
							<div className="ToolBarCdescriptionbody">
								{data.data.description}
							</div>
						</div>
						<div className="membersList">
							<div className="ToolBarCtitle">Workspace members</div>
							<div className="membersListbody">
								{" "}
								{data.data.members.map((m, index) => (
									<div className="member" key={index}>
										<PersonIcon />
										<div style={{ marginLeft: "10px" }}>{m.name}</div>
									</div>
								))}
							</div>
							<Button
								onClick={handleOpen}
								sx={{
									mb: 2,
									fontSize: "15px",
									width: "80%",
									marginLeft: "10%",
								}}
								startIcon={<Add />}
								fullWidth
							>
								Add a member
							</Button>
							<CreateMember
								Ws={data.data}
								open={open}
								handleClose={handleClose}
							/>
						</div>
					</div>
				</div>
			)}
			{error === true && (
				<Typography>
					Error fetching the workspace or the workspace doesnt exist
				</Typography>
			)}
		</>
	)
}

export default Workspace
