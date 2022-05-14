import * as React from 'react';
import { AppBar, Toolbar, Button, Typography, Avatar } from '@mui/material/';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider"
export default function TopBar() {

  const { auth } = React.useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Button variant="text" onClick={() => navigate('/')}>
        <Typography color="text.primary" size="big">
          ESI Hub
        </Typography>
        </Button>
        <Avatar alt={auth.info.name} src="/jpg" sx={{ml : 'auto'}} onClick={() => navigate('/profile')}/>
      </Toolbar>
    </AppBar>
  );
}
