import React, { useState } from 'react'
import "./Workspace.css"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Workspaces } from "@mui/icons-material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import {TaskIconMenu,WsMenu,TaskDnMenu,TaskDoMenu} from "./TaskMenu"
import { Button } from '@mui/material';
import CreateMember from './CreateMember'
import CreateTask from './CreateTask'
import CreateWorkspace from './CreateWorkspace';
import {DeleteTask,DeleteWs} from './DeleteTask';

export const Task = ({ t }) => {
    const [DTopen, setDTOpen] = React.useState(false);
    const handleOpenDT = () => {
      setDTOpen(true);
      console.log("OPEN WEE");
      setAnchorEl(false);
    };
    const handleCloseDT = () => setDTopen(false);
    const [anchorEl, setAnchorEl] = React.useState(false);
   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleOpen=()=>{
      setAnchorEl(true);
      console.log("hhhh");
    }
    const handleClose = () => {
      setAnchorEl(false);
      console.log('ffff');
    };
    return (
  
      <div className="Task">
  
        <div className="TaskC">
          <div className="TaskIcon"><AssignmentTurnedInIcon  sx={{ marginTop: "5px" }} /></div>
          <div className="Tasktext">{t.name}</div>
          <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertOutlinedIcon sx={{ marginTop: "5px",cursor:"pointer" }}/> 
        </Button>
          
        {DTopen && <DeleteTask open={DTopen} handleClose={handleCloseDT} />}
          </div>
         {anchorEl &&<TaskIconMenu   
         handleOpenDT={handleOpenDT}
          anchorEl={anchorEl}
           open={open}
           handleClose={handleClose} />}
      </div>
    )
  }
  export const TaskDo = ({ t }) => {
    const [DTopen, setDTOpen] = React.useState(false);
    const handleOpenDT = () => {
      setDTOpen(true);
      console.log("OPEN WEE");
      setAnchorEl(false);
    };
    const handleCloseDT = () => setDTopen(false);
    const [anchorEl, setAnchorEl] = React.useState(false);
   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleOpen=()=>{
      setAnchorEl(true);
      console.log("hhhh");
    }
    const handleClose = () => {
      setAnchorEl(false);
      console.log('ffff');
    };
    return (
  
      <div className="Task">
  
        <div className="TaskC">
          <div className="TaskIcon"><AssignmentTurnedInIcon  sx={{ marginTop: "5px" }} /></div>
          <div className="Tasktext">{t.name}</div>
          <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertOutlinedIcon sx={{ marginTop: "5px",cursor:"pointer" }}/> 
        </Button>
          
        {DTopen && <DeleteTask open={DTopen} handleClose={handleCloseDT} />}
          </div>
          {anchorEl && <TaskDoMenu  
         handleOpenDT={handleOpenDT}
          anchorEl={anchorEl}
           open={open}
           handleClose={handleClose} />}
      </div>
    )
  }
  export const TaskDn = ({ t }) => {
  
    const [DTopen, setDTOpen] = React.useState(false);
    const handleOpenDT = () => {
      setDTOpen(true);
      console.log("OPEN WEE");
      setAnchorEl(false);
    };
    const handleCloseDT = () => setDTopen(false);
    const [anchorEl, setAnchorEl] = React.useState(false);
   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleOpen=()=>{
      setAnchorEl(true);
      console.log("hhhh");
    }
    const handleClose = () => {
      setAnchorEl(false);
      console.log('ffff');
    };
    return (
  
      <div className="Task">
  
        <div className="TaskC">
          <div className="TaskIcon"><AssignmentTurnedInIcon  sx={{ marginTop: "5px" }} /></div>
          <div className="Tasktext">{t.name}</div>
          <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertOutlinedIcon sx={{ marginTop: "5px",cursor:"pointer" }}/> 
        </Button>
          
        {DTopen && <DeleteTask open={DTopen} handleClose={handleCloseDT} />}
          </div>
         {anchorEl &&<TaskDnMenu
         handleOpenDT={handleOpenDT}
          anchorEl={anchorEl}
           open={open}
           handleClose={handleClose} />}
      </div>
    )
  }
  export const Wspace = ({ W,ActiveWS }) => {
    const [Wopen, setWOpen] = React.useState(false);
    const handleOpenADDW = () => {
      setWOpen(true);
      console.log("OPEN WEE");
      setAnchorEl(false);
    };
    const handleClosADDW = () => setWOpen(false); 
  
    const [DWopen, setDWOpen] = React.useState(false);
    const handleOpenDW= () => {
      setDWOpen(true);
      console.log("OPEN WEE");
      setAnchorEl(false);
    };
    const handleCloseDW = () => setDWOpen(false);
  
  
    const [anchorEl, setAnchorEl] = React.useState(false);
    
   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleOpen=()=>{
      setAnchorEl(true);
      console.log("hhhh");
    }
    const handleClose = () => {
      setAnchorEl(false);
      console.log('ffff');
    };
    
    return (
  
      <div className="Wspace" onClick={ActiveWS(W)}>
        <div className="WsC">
  <div className="WspaceIcon"><Workspaces sx={{ marginTop: "5px" }} /></div>
  <div className="WspaceName">
  {W.name}
  </div>
  <MoreVertOutlinedIcon onClick={handleOpen} sx={{ marginTop: "5px",cursor:"pointer" }}/> 
  {Wopen && <CreateMember open={Wopen} handleClose={handleClosADDW} />}
  {DWopen && <DeleteWs open={DWopen} handleClose={handleCloseDW} />}
      </div>
      {anchorEl &&<WsMenu 
      handleOpenDW={handleOpenDW}
      handleOpenADD={handleOpenADDW} 
      handleClick={handleClick} 
      handleClose={handleClose} />}
      </div>
    )}