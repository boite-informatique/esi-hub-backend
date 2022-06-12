import * as React from "react"
import HomeIcon from "@mui/icons-material/Home"
import ForumIcon from "@mui/icons-material/Forum"
import ChatIcon from "@mui/icons-material/Chat"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import AnnouncementIcon from "@mui/icons-material/Announcement"
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsIcon from "@mui/icons-material/Settings"
import { Link, useNavigate } from "react-router-dom"
import "./SideBar.css"
import { useState } from "react"
const drawerWidth = 240

export default function Sections() {
  const [showNav, setShowNav] = useState(true)
  const show = () => {
    setShowNav(!showNav)
  }
  return (
    <SidebarOpen />
    // <div className="Sidebar ">
    // 	{showNav && <SidebarOpen show={show} />}
    // 	{!showNav && <SidebarClose show={show} />}
    // </div>
  )
}

export const SidebarOpen = () => {
  return (
    <div className="SidebarOpen SidebarS ">
      <header className="header">
        <div className="image-text">
          <div className="text">
            <span className="logospace">
              <img
                className="logo"
                src="/assets/logoVector.svg"
                alt="logo"
              ></img>
            </span>
            <span className="name">ESI HUB</span>
          </div>
        </div>
      </header>

      <ul>
        <Link to="/">
          <li className="Sidebarelement Sidebarelement-open">
            <div className="icon ">
              <HomeIcon />
            </div>
            <span className="item text">Home</span>
          </li>
        </Link>
        <Link to="/announcements">
          <li className="Sidebarelement Sidebarelement-open">
            <div className="icon ">
              <AnnouncementIcon />
            </div>
            <span className="item text">Announces</span>
          </li>
        </Link>
        <Link to="/workspaces">
          <li className="Sidebarelement Sidebarelement-open">
            <div className="icon ">
              <AssignmentTurnedInIcon />
            </div>
            <span className="item text">WorkSpace</span>
          </li>
        </Link>
        {/* <Link to="/Forum">
					<li className="Sidebarelement Sidebarelement-open">
						<div className="icon ">
							<ForumIcon />
						</div>
						<span className="item text">Forums</span>
					</li>
				</Link>
				<Link to="/chat">
					<li className="Sidebarelement Sidebarelement-open">
						<div className="icon ">
							<ChatIcon />
						</div>
						<span className="item text">Chat</span>
					</li>
				</Link>
				<Link to="/Settings">
					<li className="Sidebarelement Sidebarelement-open">
						<div className="icon ">
							<SettingsIcon />
						</div>
						<span className="item text">Settings</span>
					</li>
				</Link> */}
      </ul>

      <footer>
        <div className="Sidebarelement Sidebarelement-open log-out">
          {" "}
          <div className="icon ">
            <LogoutIcon />
          </div>
          <a href="#">
            <span className="item text ">Log out</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
export const SidebarClose = ({ show }) => {
  return (
    <div className="SidebarClose SidebarS  " onClick={show}>
      <div className="logoclose">
        <span className="logospaceC">
          <img className="logo" src="/assets/logoVector.svg" alt="logo"></img>
        </span>
      </div>

      <div className="Sidebarelement-close Sidebarelement ">
        <div className="icon ">
          <HomeIcon />
        </div>
      </div>

      <div className="Sidebarelement-close Sidebarelement">
        <div className="icon ">
          <AnnouncementIcon />
        </div>
      </div>

      <div className="Sidebarelement-close Sidebarelement">
        <div className="icon ">
          <AssignmentTurnedInIcon />
        </div>
      </div>

      <div className="Sidebarelement-close Sidebarelement">
        <div className="icon ">
          <ForumIcon />
        </div>
      </div>
      <div className="Sidebarelement-close Sidebarelement">
        <div className="icon ">
          <IntegrationInstructionsIcon />
        </div>
      </div>

      <div className="Sidebarelement-close Sidebarelement">
        <div className="icon ">
          <SettingsIcon />
        </div>
      </div>

      <div className="Sidebarelement-close Sidebarelement log-out">
        {" "}
        <div className="icon ">
          <LogoutIcon />
        </div>
      </div>
    </div>
  )
}
