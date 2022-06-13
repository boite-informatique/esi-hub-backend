import React, { useState } from "react"
import "./Workspace.css"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"

import { Add } from "@mui/icons-material"
import axios from "../../axios"
import { Typography, Button } from "@mui/material"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import image1 from "/assets/image1.svg"
import AddCircleIcon from "@mui/icons-material/AddCircle"

import { WsBoard } from "./WsBoard"

import { Wspace } from "./Task"

import CreateWorkspace from "./CreateWorkspace"
const BASE_URL = "http://localhost:3005"

function Workspaces() {
	const fetchworkspaces = async () =>
		await axios.get(`/api/workspace`, {
			withCredentials: true,
		})
	const { data, error, status, refetch, ...other } = useQuery(
		"workspaces",
		fetchworkspaces
	)
	/***************************/

	/****************** */

	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
			<div className="Workspace">
				<div className="WorkspaceW">
					<div
						style={{
							position: "relative",
							width: "100%",
							fontSize: "80px",
							marginLeft: "15%",
							marginTop: "3%",
							display: "flex",
							zIndex: 3,
						}}
					>
						<div>W</div>
						<AssignmentTurnedInIcon
							sx={{
								fontSize: "90px",
								marginTop: "10px",
							}}
						/>
						<div>RKSPACE</div>
					</div>

					<div
						style={{
							width: "100%",
							position: "relative",
							zIndex: 3,
							fontSize: "30px",
							marginLeft: "17%",
							marginTop: "-20px",
							color: "#2a2e32",
							opacity: "90%",
						}}
					>
						helps teams move work forward
					</div>

					<img
						src={image1}
						style={{
							position: "relative",
							width: "500px",
							marginLeft: "25%",
							marginTop: "-15%",
							zIndex: 0,
						}}
					/>
				</div>
				<div className="ToolBar">
					<div className="ToolBarHeader">
						<div className="WorkSpaceTitle">MY WORKSPACES</div>
						<div className="WAddCircleIcon" onClick={() => setOpen(true)}>
							<AddCircleIcon />
						</div>
						<CreateWorkspace open={open} handleClose={handleClose} />
					</div>
					<div className="ToolBarC">
						{status === "success" &&
							data.data.map((W, index) => <Wspace W={W} key={index} />)}

						{status === "loading" && <Typography>Loading ...</Typography>}

						{status === "error" && <Typography>No Workspaces Found</Typography>}
					</div>
				</div>
			</div>
		</>
	)
}

export default Workspaces
