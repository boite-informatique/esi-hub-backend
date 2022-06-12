import "./TopBar.css"
import SearchIcon from '@mui/icons-material/Search';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {  useState } from 'react';
export default function TopBar() {
  const [openNot,setOpenNot] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    
      <div className="Topbar ">
      <div className="TopbarLeft"></div>
      
      
      <div className="TopbarRight">
        <div className="iconsC">
        
        <div className="search-box ">
        <button className="btn-search" ><div className="sicon-c"><SearchIcon/></div></button>
        <input type="text" className="input-search" placeholder="         Type here to Search ..."/>
        </div>
    
     
      <div className="iconC">
    <NotificationsIcon sx={{height:22,width:22,marginTop:0.2,marginLeft:0.4,color:'var(--sidebar-color)'}}/>
      </div>
      <div className="iconC" > <Avatar alt="Remy Sharp" src="" sx={{height:30,width:30}}
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        ></Avatar>
      </div>
      <Menu
          sx={{marginTop:1.5,}}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          
        >
          <MenuItem selected className="MenuItem" onClick={handleClose}>Profile</MenuItem>
          <MenuItem selected className="MenuItem"  onClick={handleClose}>My account</MenuItem>
          <MenuItem  selected className="MenuItem" onClick={handleClose}>Help</MenuItem>
        </Menu>
      </div>
      </div>  </div>
      
       
    )
}
