import {
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  Box,
  CssBaseline
} from "@mui/material"
import axios from "axios"
import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../AuthProvider"

function Login() {
  const baseURL = "http://localhost:3005"

  const { auth, setAuth } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [alert, setalert] = useState({
    severity: "",
    text: "",
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((values) => ({ ...values, [name]: value }))
  }

  const handleLogin = (data) => {
    setAuth({isAuth : true, info : data})
    setalert({severity : "success", text : "you're successfully logged in"})
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios({
        method: "post",
        url : 'http://localhost:3005/api/user/login',
        data: formData,
        withCredentials : true
      })
      console.log(res.data)

      if (res.data.error) {
        setalert({
          severity: "error",
          text: <Typography>{res.data.error}</Typography>,
        })
      } else if (res.data.verified === false) {
        setalert({
          severity: "warning",
          text: (
            <Typography>
              Account is unverified,{" "}
              <Link
                to={"/verify?email=" + formData.email}
                style={{ textDecoration: "none" }}
              >
                Click here to verify account
              </Link>
            </Typography>
          ),
        })
      } else {
        handleLogin(res.data)
      }
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 404) {
        setalert({
          severity: "error",
          text: <Typography>Incorrect Email or Password</Typography>,
        })
      } else {
        setalert({
          severity: "error",
          text: <Typography>Unknown error</Typography>,
        })
      }
    }
  }

  return (
    <Box>
    <CssBaseline />
    <Container>
      <Typography variant="h3" align="center" color="primary" my={2}>
        ESI Hub
      </Typography>
      <Card sx={{ width: 500, marginX: "auto", marginY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            gap={3}
          >
            <CardHeader title="Login to ESI Hub" />
            {alert.text !== "" && (
              <Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
                {alert.text}
              </Alert>
            )}
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="filled"
              onChange={handleChange}
              value={formData.email}
              required
              sx={{ width: "60%" }}
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              variant="filled"
              onChange={handleChange}
              value={formData.password}
              required
              sx={{ width: "60%" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "20%" }}
            >
              Login
            </Button>
            <Typography gutterBottom>
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </Typography>
          </Grid>
        </form>
      </Card>
    </Container>
    </Box>
  )
}

export default Login
