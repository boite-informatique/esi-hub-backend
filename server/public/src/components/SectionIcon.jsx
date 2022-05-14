import React from 'react'
import {Home, Workspaces, Chat, Campaign, Settings} from '@mui/icons-material'

function SectionIcon({iconName}) {
  switch (iconName) {
    case 'Home': return <Home />
    case 'Workspaces': return <Workspaces />
    case 'Chat': return <Chat />
    case 'Campaign': return <Campaign />
    case 'Settings': return <Settings />
    default: return null
  }
}

export default SectionIcon