import * as React from "react"
import PersonIcon from "@mui/icons-material/Person"
import Paper from "@mui/material/Paper"
import AppsIcon from "@mui/icons-material/Apps"
import MenuList from "@mui/material/MenuList"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import axios from "axios"
import Typography from "@mui/material/Typography"
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline"
import DeleteIcon from "@mui/icons-material/Delete"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import EditIcon from "@mui/icons-material/Edit"

export const TaskMenu = ({ id, handleOpenDT, anchorEl, open, handleClose }) => {
	const TakeCharge = async () => {
		await axios
			.put(
				`http://localhost:3005/api/task/${id}?status=0`,
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data)
				handleClose()
			})
			.catch((err) => console.log("err"))
	}
	return (
		<div>
			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={() => TakeCharge(id)} disableRipple>
					<TaskAltIcon />
					take charge
				</MenuItem>
				<MenuItem onClick={handleOpenDT} disableRipple>
					<DeleteIcon />
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}
/*-----------------*/

export const WsMenu = ({
	handleOpenDW,
	handleOpenWS,
	anchorEl,
	open,
	handleClose,
}) => {
	return (
		<div>
			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleOpenWS} disableRipple>
					<AppsIcon />
					Open Workspace
				</MenuItem>
				<MenuItem onClick={handleOpenDW} disableRipple>
					<DeleteIcon />
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}

/*-----------------*/
export const TaskDoMenu = ({
	id,
	handleOpenDT,
	anchorEl,
	open,
	handleClose,
}) => {
	const DoneTask = async (id) => {
		axios
			.put(
				`http://localhost:3005/api/task/${id}?status=1`,
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data)
				handleClose()
			})
			.catch((err) => console.log("err"))
	}
	return (
		<div>
			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={() => DoneTask(id)} disableRipple>
					<TaskAltIcon />
					Done
				</MenuItem>
				<MenuItem onClick={handleOpenDT} disableRipple>
					<DeleteIcon />
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}

/*-----------------*/
export const TaskDnMenu = ({ handleOpenDT, anchorEl, open, handleClose }) => {
	return (
		<div>
			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleOpenDT} disableRipple>
					<DeleteIcon />
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}
