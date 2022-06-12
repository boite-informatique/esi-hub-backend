import React, { useState } from "react"
import "./Workspace.css"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined"
import { Workspaces } from "@mui/icons-material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PersonIcon from "@mui/icons-material/Person"

import { Button } from "@mui/material"

import {
	Select,
	TextField,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material"
import { Task, TaskDo, TaskDn } from "./Task"
import CreateMember from "./CreateMember"
import CreateTask from "./CreateTask"
import CreateWorkspace from "./CreateWorkspace"
import { DeleteTask, DeleteWs } from "./DeleteTask"
export const WsBoard = ({ tasks }) => {
	return (
		<div className="WorkspaceC">
			<ToDO tasks={tasks.filter((task) => task.status === "Planned")} />
			<Doing tasks={tasks.filter((task) => task.status === "In progress")} />
			<Done tasks={tasks.filter((task) => task.status === "Done")} />
		</div>
	)
}

export const ToDO = ({ tasks }) => {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
	return (
		<div className="Tasks">
			<div className="TasksT">
				<div className="TitleDO">To DO</div>
				<div className="TAddCircleIcon" onClick={handleOpen}>
					<AddCircleIcon />
				</div>
			</div>

			{tasks.map((t, index) => (
				<Task t={t} key={index} />
			))}

			<CreateTask open={open} handleClose={handleClose} />
		</div>
	)
}
export const Done = ({ tasks }) => {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
	return (
		<div className="Tasks">
			<div className="TasksT">
				<div className="TitleDO">Done</div>
			</div>

			{tasks.map((t, index) => (
				<TaskDn t={t} key={index} />
			))}

			<CreateTask open={open} handleClose={handleClose} />
		</div>
	)
}
export const Doing = ({ tasks }) => {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
	return (
		<div className="Tasks">
			<div className="TasksT">
				<div className="TitleDO">Doing</div>
			</div>

			{tasks.map((t, index) => (
				<TaskDo t={t} key={index} />
			))}

			<CreateTask open={open} handleClose={handleClose} />
		</div>
	)
}
