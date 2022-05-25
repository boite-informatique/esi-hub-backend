import React, { useState } from 'react'
import "./Workspace.css"

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { WsBoard } from './WsBoard';

import { Wspace} from './Task';

import CreateWorkspace from './CreateWorkspace';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
;

function Workspace() {
const [ActiveWSid,setActiveWSid]=useState(12);

const fetchAnnouncements = async () =>
		await axios.get(`http://localhost:3005/api/workspace/?limit=50`, {
			withCredentials: true,
		})
	const { data, error, status, refetch, ...other } = useQuery(
		"announcements",
		fetchAnnouncements
	)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "hhhhhhhh",
      User: "",
      Workspace:{id:12,
        name:"Projet"},
    },
   
   
  ])
  
  const [WS,setWS]=useState([
    {id:12,
    name:"Projet"},
    {id:13,
  name:"KHdma"}]) 


const ActiveWS=({_id})=>{
  setActiveWSid(_id)
  console.log(_id);
}





  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("OPEN WEE")
  };
  const handleClose = () => {setOpen(false);console.log("khkhkh")}
  return (<>
   
    < div className="Workspace">

    <WsBoard tasks={tasks}  />
    <div className="ToolBar">
   
    <div className="ToolBarHeader">
     <div className="WorkSpaceTitle">MY WORKSPACES</div> 
      <div className="WAddCircleIcon" onClick={handleOpen}>
        <AddCircleIcon />
         </div>
      <CreateWorkspace open={open} handleClose={handleClose} />
      </div>
      <div className="ToolBarC">
      {//WS.map((W)=><Wspace W={W} ActiveWS={ActiveWS}/>)
      }
      {status === "loading" && <Typography>Loading...</Typography>}

      {status === "success" && 
        console.log(data.data) &&
        data.data.map((workspace, index) => 
        <Wspace W={workspace} key={index} ActiveWS={ActiveWs}/>)
      }
      </div>
    </div>
    
    </div></>
  )
}







export default Workspace;