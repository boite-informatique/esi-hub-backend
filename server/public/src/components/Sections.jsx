import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import sections from "../sections.json"
import SectionIcon from "./SectionIcon"
import { Link, useNavigate } from "react-router-dom"
const drawerWidth = 240

export default function Sections() {

  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sections.map((text, index) => (
            <ListItem button onClick={() => navigate(text.link)} key={index}>
              <ListItemIcon>
                <SectionIcon iconName={text.icon} />
              </ListItemIcon>
              <ListItemText primary={text.name}/>
            </ListItem>
          ))}
          <ListItem button sx={{ marginTop: "100%" }}>
            <ListItemIcon>
              <SectionIcon iconName="Settings" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
