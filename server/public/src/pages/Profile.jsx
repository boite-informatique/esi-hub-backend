import { Card, Container, Breadcrumbs, Typography, Avatar, CardContent, CardHeader, Stack, Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Profile() {
    const baseURL = 'http://localhost:3005'
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
  
    useEffect(() => {
      axios.get(`${baseURL}/api/user/current`, {withCredentials : true})
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(err => setError(true))
    }, [])

  return (
    <Container>
        <Breadcrumbs sx={{marginBottom : 2}}>
          <Link to="/" style={{textDecoration : 'none'}}>
            <Typography color="text.primary">
              Home
            </Typography>
          </Link>

        <Typography>
            Your Profile
        </Typography>
        </Breadcrumbs>
        <Card>
            {data && 
              <>
                <Avatar alt={data.name} src={data.avatar} sx={{height : 96, width : 96, mx : 'auto', my : 2}}/>
                <CardContent>
                  <Typography>Name : {data.name}</Typography>
                  <Typography>Email : {data.email}</Typography>
                  {data.groups.length > 0 &&
                    <Stack direction="row" spacing={0.7}>
                      <Typography sx={{display : 'inline-block'}}>Groups : </Typography>
                        {data.groups.map((group, index) =>
                      <Chip key={index} label={group.name} color ="primary" variant="outlined" size="small" />
                    )}
                  </Stack>
                  }
                </CardContent>
              </>
            }
        </Card>
    </Container>
  )
}

export default Profile
