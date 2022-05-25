import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


export  function TaskIconMenu({handleOpenDT,handleClick,handleClose}) {
  return (
    <div className="TaskIconMenu">
    <Paper sx={{ width: 220, maxWidth: '100%' ,zIndex:4} } 
   >
      <MenuList 
      onClose={handleClose} 
      onClick={handleClick}
        > 
        <MenuItem onClick={handleOpenDT}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
          
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ModeEditOutlineIcon  fontSize="small" />
          </ListItemIcon>
          <ListItemText>Modify</ListItemText>
          
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TaskAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>take charge</ListItemText>
        
        </MenuItem>
        
        
      </MenuList>
    </Paper></div>
  );
}
export function WsMenu({handleOpenDW,handleOpenADD,anchorEl,open,handleClose}) {
    return (
      <div className="TaskIconMenu">
      <Paper sx={{ marginLeft:"-50px",width: 220,height:120 } }  
     >
        <MenuList 
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         
         MenuListProps={{
           'aria-labelledby': 'basic-button',
         }}>
          <MenuItem onClick={handleOpenDW}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText onClick={handleClose}>Delete</ListItemText>
            
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ModeEditOutlineIcon  fontSize="small" />
            </ListItemIcon>
            <ListItemText>Modify</ListItemText>
            
          </MenuItem>
          <MenuItem onClick={handleOpenADD}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add member</ListItemText>
          
          </MenuItem>
          
          
        </MenuList>
      </Paper></div>
    );
  }
  export function TaskDoMenu({handleOpenDT,anchorEl,open,handleClose}) {
    return (
      <div className="TaskIconMenu">
      <Paper sx={{ width: 220, maxWidth: '100%' }}  
     >
        <MenuList 
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         
         MenuListProps={{
           'aria-labelledby': 'basic-button',
         }}>
          <MenuItem onClick={handleOpenDT}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText onClick={handleClose}>Delete</ListItemText>
            
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ModeEditOutlineIcon  fontSize="small" />
            </ListItemIcon>
            <ListItemText>Modify</ListItemText>
            
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Done</ListItemText>
          
          </MenuItem>
          
          
        </MenuList>
      </Paper></div>
    );
  }
  export function TaskDnMenu({handleOpenDT,anchorEl,open,handleClose}) {
    return (
      <div className="TaskIconMenu">
      <Paper sx={{ width: 220, maxWidth: '100%' } }  
     >
        <MenuList 
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         
         MenuListProps={{
           'aria-labelledby': 'basic-button',
         }}>
          <MenuItem onClick={handleOpenDT}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText >Delete</ListItemText>
            
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ModeEditOutlineIcon  fontSize="small" />
            </ListItemIcon>
            <ListItemText>Modify</ListItemText>
            
          </MenuItem>
         
          
        </MenuList>
      </Paper></div>
    );
  }