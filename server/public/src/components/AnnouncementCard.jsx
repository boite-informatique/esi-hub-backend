import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function AnnouncementCard({data}) {
  const color=(user)=>{
    let color;
    switch(user) {
      case "Alphabit":
        color="#4096d1";
        break;
      case "Ingeniums":
        color="#101012";
        break;
        
      default:
        color="#b8b8b8";
    } 
    return color;
  }
  return (
    <div className="AnnouncementCard" style={{borderColor:color(data.user.name)}}>
      
        <CardHeader 
          title={<Link to={'/announcements/' + data._id} style={{textDecoration : 'none'},{fontSize:200}}><Typography color="text.primary">{data.title}</Typography></Link>}
          avatar={<Avatar alt={data.user.name} src={data.user.avatar}/>}
          subheader={'By: ' + data.user.name}
          sx={{mb : -2}}
        />

        <CardContent >
          <Typography variant="body2" gutterBottom>
            {data.body.length > 90 ? data.body.slice(90) + '...' : data.body} 
          </Typography>
        </CardContent>

      </div>
  )
}

export default AnnouncementCard