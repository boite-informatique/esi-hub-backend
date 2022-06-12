import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home/Home"
import { Toolbar, Box, CssBaseline } from "@mui/material"
import TopBar from "../components/TopBar"
import Sections from "../components/Sections"
import Announcements from "./Announcements/Announcements"
import Workspaces from "./Workspace/Workspaces.jsx"
import Chat from "././Chat/Chat"
import Announcement from "./Announcements/Announcement"
import CreateAnnouncement from "./Announcements/CreateAnnouncement"
import Profile from "./Profile"
import HBackground from "./HomeBackground/HomeBackground"
import Workspace from "./Workspace/Workspace"

export default function Dashboard() {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<TopBar />
			<Sections />
			<HBackground />

			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/announcements" element={<Announcements />} />
					<Route path="announcements/create" element={<CreateAnnouncement />} />
					<Route path="announcements/:id" element={<Announcement />} />
					<Route path="workspaces" element={<Workspaces />} />
					<Route path="workspaces/:id" element={<Workspace />} />
					{/* <Route path="chat" element={<Chat />} /> */}
					<Route path="profile" element={<Profile />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Box>
		</Box>
	)
}
