import React, { useState } from 'react'
import { List, ListItem, ListItemText, ListSubheader, Collapse, Divider, IconButton, ListItemIcon, Checkbox, ListItemButton } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import groups from './groups.json'

export default function GroupList({data : groups, checked, setChecked}) {
//   const [title, setTitle] = useState('yeah')
//   const [checked, setChecked] = useState([])

  const handleCheck = (groupName) => {
    checked.includes(groupName) ? setChecked(prevState => prevState.filter(val => val !== groupName)) : setChecked(prevState => [...prevState, groupName])
    console.log(checked)
    //setChecked(groupName)
  }


  function MenuItem({_id, name, children = []}) {

    const [open, setOpen] = useState(false)
    const isExpendable = children.length > 0

    const handleCollapse = () => {
      setOpen(!open)
    }

    return (
      <>
      <ListItem
        secondaryAction={ isExpendable &&
          <IconButton onClick={handleCollapse} edge="end">
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }>
        <ListItemButton>
          <ListItemIcon>
            <Checkbox
            edge="start"
            onClick={() => handleCheck(_id)}
            checked={checked.includes(_id)}
            disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={name}/>
        </ListItemButton>
      </ListItem>

      { isExpendable &&
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{pl : 2}} dense>
            {children.map((child, index) =>
              <MenuItem {...child} key={index}/>
              )}
          </List>
        </Collapse>
      }
      </>
    )
  }

  return (
    <List dense component="div" sx={{ width : '100%', maxWidth : 240}}>
    {groups.map((group, index) =>
      <MenuItem {...group} key={index} />
    ) }
    </List>
  )
}

