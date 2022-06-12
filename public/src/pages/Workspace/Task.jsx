import React, { useState, useCallback } from "react"
import "./Workspace.css"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate"
import AssignmentIcon from "@mui/icons-material/Assignment"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined"
import { Workspaces } from "@mui/icons-material"
import axios from "../../axios"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Link, useNavigate, Navigate } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import { TaskMenu, WsMenu, TaskDnMenu, TaskDoMenu } from "./TaskMenu"
import CreateMember from "./CreateMember"

import { DeleteTask, DeleteWs } from "./DeleteTask"

export const Task = ({ t }) => {
	/*--------------------------------------------*/

	/*--------------------------------------------*/
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [openD, setOpenD] = React.useState(false)
	const handleOpenD = () => {
		setOpenD(true)
		setAnchorEl(null)
	}
	const handleCloseD = () => {
		setOpenD(false)
	}
	/**** */
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<DeleteTask id={t._id} open={openD} handleClose={handleCloseD} />
			<div className="Task">
				<div className="TaskC">
					<div className="TaskIcon">
						<AssignmentIcon sx={{ marginTop: "5px" }} />
					</div>
					<div className="Tasktext">{t.name}</div>
					<MoreVertOutlinedIcon
						onClick={handleClick}
						sx={{ marginTop: "5px", cursor: "pointer" }}
					/>
				</div>
			</div>
			<TaskMenu
				id={t._id}
				handleOpenDT={handleOpenD}
				anchorEl={anchorEl}
				open={open}
				handleClose={handleClose}
			/>
		</>
	)
}
/*-----------------------------------------------*/
export const TaskDo = ({ t }) => {
	const [openD, setOpenD] = React.useState(false)
	const handleOpenD = () => {
		setOpenD(true)
		setAnchorEl(null)
	}
	const handleCloseD = () => {
		setOpenD(false)
	}
	/**** */
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<div className="Task">
				<div className="TaskC">
					<div className="TaskIcon">
						<AssignmentLateIcon sx={{ marginTop: "5px" }} />
					</div>
					<div className="Tasktext">{t.name}</div>

					<MoreVertOutlinedIcon
						onClick={handleClick}
						sx={{ marginTop: "5px", cursor: "pointer" }}
					/>
				</div>
				<div className="InCharge">by : {t.userInCharge.name}</div>
				<TaskDoMenu
					id={t._id}
					handleOpenDT={handleOpenD}
					anchorEl={anchorEl}
					open={open}
					handleClose={handleClose}
				/>
			</div>
			<DeleteTask id={t._id} open={openD} handleClose={handleCloseD} />
		</>
	)
}
/*-----------------------------------------------*/
export const TaskDn = ({ t }) => {
	const [openD, setOpenD] = React.useState(false)
	const handleOpenD = () => {
		setOpenD(true)
		setAnchorEl(null)
	}
	const handleCloseD = () => {
		setOpenD(false)
	}
	/**** */

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<div className="Task">
				<div className="TaskC">
					<div className="TaskIcon">
						<AssignmentTurnedInIcon sx={{ marginTop: "5px" }} />
					</div>
					<div className="Tasktext">{t.name}</div>
					<MoreVertOutlinedIcon
						onClick={handleClick}
						sx={{ marginTop: "5px", cursor: "pointer" }}
					/>
				</div>
				<div className="InCharge">by : {t.userInCharge.name}</div>
				<TaskDnMenu
					handleOpenDT={handleOpenD}
					anchorEl={anchorEl}
					open={open}
					handleClose={handleClose}
				/>
			</div>
			<DeleteTask id={t._id} open={openD} handleClose={handleCloseD} />
		</>
	)
}
/*-----------------------------------------------*/
export const Wspace = ({ W }) => {
	const [openDW, setOpenDW] = React.useState(false)
	const handleOpenDW = () => {
		setOpenDW(true)
		setAnchorEl(null)
	}
	const handleCloseDW = () => {
		setOpenDW(false)
	}
	/**µµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ */
	let navigate = useNavigate()

	const handleopenWS = () => {
		navigate(`/workspaces/${W._id}`)
		setAnchorEl(null)
	}

	/**µµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ */
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<div className="Wspace">
				<div className="WsC">
					<div className="WspaceIcon">
						<Workspaces sx={{ marginTop: "5px" }} />
					</div>

					<div
						className="WspaceName"
						onClick={() => navigate(`/workspaces/${W._id}`)}
					>
						{W.name}
					</div>
					<MoreVertOutlinedIcon
						onClick={handleClick}
						sx={{ marginTop: "5px", cursor: "pointer" }}
					/>
				</div>
				<WsMenu
					id={W._id}
					open={open}
					anchorEl={anchorEl}
					handleOpenDW={handleOpenDW}
					handleOpenWS={handleopenWS}
					handleClick={handleClick}
					handleClose={handleClose}
				/>
				<DeleteWs open={openDW} handleClose={handleCloseDW} id={W._id} />
			</div>
		</div>
	)
}
