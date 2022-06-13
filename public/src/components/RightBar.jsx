import React, { useState } from "react"
import "./RightBar.css"
import InfoIcon from "@mui/icons-material/Info"
import { Link, useNavigate, Navigate } from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import ArrowDropDownCircleTwoToneIcon from "@mui/icons-material/ArrowDropDownCircleTwoTone"
import Avatar from "@mui/material/Avatar"
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone"
// import Losts from "./Losts"

export const RightBar = () => {
	let navigate = useNavigate()

	const handleopenMyprofile = () => {
		navigate(`/profile`)
	}
	const handleopenSettings = () => {
		navigate(`/settings`)
	}

	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen(false)
	}
	const handleOpen = () => {
		setOpen(true)
	}
	const [OpenRB, setOpenRB] = useState(false)
	const [focus1, setFocus1] = useState(false)
	const [focus2, setFocus2] = useState(false)
	const [focus3, setFocus3] = useState(false)
	const onmouseover1 = () => {
		setFocus1(!focus1)
	}
	const onmouseover2 = () => {
		setFocus2(!focus2)
	}
	const onmouseover3 = () => {
		setFocus3(!focus3)
	}
	const OpenRightBar = () => {
		setOpenRB(true)
	}
	const CloseRightBar = () => {
		setOpenRB(false)
	}

	return (
		<div className="RightBarC">
			{!OpenRB && (
				<div className="RightBarF">
					<ArrowDropDownCircleTwoToneIcon
						onClick={OpenRightBar}
						sx={{
							fontSize: 35,
							marginTop: "5px",
							zIndex: 3,
							cursor: "pointer",
							marginLeft: "20px",
							color: "#0087a1",
						}}
					/>{" "}
				</div>
			)}

			{OpenRB && (
				<div>
					<div className="RightBarF">
						{" "}
						<ArrowCircleUpTwoToneIcon
							onClick={CloseRightBar}
							sx={{
								fontSize: 35,
								marginTop: "5px",
								cursor: "pointer",
								marginLeft: "20px",
								color: "#0087a1",
							}}
						/>{" "}
					</div>
					<div className="RightBarO">
						<div className="RightBarOC">
							{!focus1 && (
								<div className="AvatarR" onMouseEnter={onmouseover1}>
									{" "}
									<Avatar
										alt="Remy Sharp"
										src=""
										sx={{ height: 30, width: 30 }}
										id="demo-positioned-button"
										aria-controls={open ? "demo-positioned-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={open ? "true" : undefined}
									></Avatar>
								</div>
							)}
							{focus1 && (
								<div
									className="AvatarR OpenR "
									onClick={handleopenMyprofile}
									onMouseLeave={onmouseover1}
								>
									<div>My profil</div>
									<Avatar
										alt="Remy Sharp"
										src=""
										sx={{ marginLeft: 8.5, height: 30, width: 30 }}
										id="demo-positioned-button"
										aria-controls={open ? "demo-positioned-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={open ? "true" : undefined}
									></Avatar>
								</div>
							)}
							{!focus2 && (
								<div className="iconR " onMouseEnter={onmouseover2}>
									<SettingsIcon sx={{ fontSize: 30 }} />
								</div>
							)}
							{focus2 && (
								<div
									className="iconR OpenR "
									onClick={handleopenSettings}
									onMouseLeave={onmouseover2}
								>
									<div>Settings</div>
									<SettingsIcon sx={{ marginLeft: 9, fontSize: 30 }} />
								</div>
							)}

							{/* {!focus3 && (
								<div className="iconR " onMouseEnter={onmouseover3}>
									<InfoIcon sx={{ fontSize: 30 }} />
								</div>
							)} */}
							{/* {focus3 && (
								<div
									className="iconR OpenR "
									onClick={handleOpen}
									onMouseLeave={onmouseover3}
								>
									<div>Losts & founds</div>
									<InfoIcon sx={{ marginLeft: 2.1, fontSize: 30 }} />
								</div>
							)}
							<Losts open={open} handleClose={handleClose} /> */}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
