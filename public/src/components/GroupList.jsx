import React, { useState } from "react"
import {
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Collapse,
	Divider,
	IconButton,
	ListItemIcon,
	Checkbox,
	ListItemButton,
} from "@mui/material"
import { ExpandMore, ExpandLess } from "@mui/icons-material"
import groups from "./groups.json"

export default function GroupList({ data: groups, checked, setChecked }) {
	//   const [checked, setChecked] = useState([])

	return (
		<List
			dense
			component="div"
			sx={{ width: "100%", maxWidth: 350, maxHeight: 240, overflow: "scroll" }}
		>
			{groups.map((group, index) => (
				<MenuItem
					{...group}
					key={index}
					checked={checked}
					setChecked={setChecked}
				/>
			))}
		</List>
	)
}

function MenuItem({ _id, name, children = [], checked, setChecked }) {
	const [open, setOpen] = useState(false)
	const isExpendable = children.length > 0

	const handleCheck = (id) => {
		checked.includes(id)
			? setChecked((prevState) => prevState.filter((val) => val != id))
			: setChecked((prevState) => [...prevState, id])
		//setChecked(id)
	}

	const handleCollapse = () => {
		setOpen(!open)
	}

	return (
		<>
			<ListItem
				secondaryAction={
					isExpendable && (
						<IconButton onClick={handleCollapse} edge="end">
							{open ? <ExpandLess /> : <ExpandMore />}
						</IconButton>
					)
				}
			>
				<ListItemButton>
					<ListItemIcon>
						<Checkbox
							edge="start"
							onClick={() => handleCheck(_id)}
							checked={checked.includes(_id)}
							disableRipple
						/>
					</ListItemIcon>
					<ListItemText primary={name} />
				</ListItemButton>
			</ListItem>

			{isExpendable && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: 2 }} dense>
						{children.map((child, index) => (
							<MenuItem
								{...child}
								key={index}
								checked={checked}
								setChecked={setChecked}
							/>
						))}
					</List>
				</Collapse>
			)}
		</>
	)
}
