import React, { useState } from 'react'
import "./Workspace.css"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Workspaces } from "@mui/icons-material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import {TaskIconMenu,WsMenu,TaskDnMenu,TaskDoMenu} from "./TaskMenu"
import { Button } from '@mui/material';

import { Select, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Task,TaskDo,TaskDn ,Wspace} from './Task';
import CreateMember from './CreateMember'
import CreateTask from './CreateTask'
import CreateWorkspace from './CreateWorkspace';
import {DeleteTask,DeleteWs} from './DeleteTask'
export const WsBoard=({tasks,ActiveWSid})=>{
    const [ts,setTs]=useState([{
      id: 1,
      name: "hhhhhhhh",
      User: "",
      Workspace:{id:12,
        name:"Projet"},
    },]);
    {tasks.map((t)=>{if(ActiveWSid==t.Workspace.id){setTs([...ts,t])}})}
  return(
    <div className="WorkspaceC">
     
        <ToDO tasks={tasks} />
        <Doing tasks={tasks} />
        <Done tasks={tasks} /> 
      </div>
  )
  }
  
  
  
   
  export const ToDO = ({tasks}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
      console.log("OPEN WEE")
    };
    const handleClose = () => setOpen(false);
    return (
      <div className="Tasks">
        <div className="TasksT"><div className="TitleDO">To DO</div><div className="TAddCircleIcon" onClick={handleOpen}><AddCircleIcon /></div></div>
  
        {tasks.map((t) => <Task t={t} />)}
        
          <CreateTask  open={open} handleClose={handleClose} />
        
      </div>)
  }
  export const Done = ({tasks}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
      console.log("OPEN WEE")
    };
    const handleClose = () => setOpen(false);
    return (
      <div className="Tasks">
        <div className="TasksT"><div className="TitleDO">Done</div></div>
  
        
        {tasks.map((t) => <TaskDn t={t} />)}
        
        
          <CreateTask  open={open} handleClose={handleClose} />
        
      </div>)
  }
  export const Doing = ({tasks}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
      console.log("OPEN WEE")
    };
    const handleClose = () => setOpen(false);
    return (
      <div className="Tasks">
        <div className="TasksT"><div className="TitleDO">Doing</div></div>
  
       
        {tasks.map((t) => <TaskDo t={t} />)}
        
        
          <CreateTask  open={open} handleClose={handleClose} />
        
      </div>)
  }
  
  
  
  
  
  