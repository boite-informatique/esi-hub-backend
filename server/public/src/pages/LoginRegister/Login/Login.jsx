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
import { AuthContext } from "../../../AuthProvider"
import Background from "../Background/Background"
import logo from './logo2(1).svg'
import './Login.css'

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
    <Container>
      <Background/>
      <div className="center">
      <img src={logo} alt='cv chweya'  className="hello"/>
        <form onSubmit={handleSubmit}>
          
                    <h1>Login</h1>

            {alert.text !== "" && (
              <Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
                {alert.text}
              </Alert>
            )}
           <div className='txt_field'>
              <input 
                     name="email"
                     label="Email"
                     type="text"
                     variant="filled"                    
                     onChange={handleChange}
                     value={formData.email}
                     required 
                     />
              <label>Email</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input 
                    name="password"
                    type="password"
                    label="Password"
                    variant="filled"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
              <label>Password</label>
              <span></span>
          </div>

         <input  type="submit" value="Sign in"></input>
          <div className='signup_link' >
           Not a member?  <Link to="/signup"> Sign up </Link>
            </div>
        
        </form>
         
      
        </div>
    </Container>
    </Box>
  )
}

export default Login
