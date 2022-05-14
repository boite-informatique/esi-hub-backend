import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider"

function ProtectedRoute({ component: Component, admin }) {

  const {auth, setAuth} = useContext(AuthContext)
  const [success, setSuccess] = useState(auth.isAuth ? 'y' : 'wait')

  if (!auth.isAuth) {
    // make request to refresh
    axios({
        method : "get",
        url : "http://localhost:3005/api/user/current",
        withCredentials : true
      })
    .then(res => {
      if (res?.status === 200) {
        setSuccess('y')
        setAuth({isAuth : true, info : res.data})
      } else {
        setSuccess('n')
      }
    })
    .catch(err => setSuccess('n'))
  }

  if (success === 'y') return <Component />
  if (success === 'n') return <Navigate to='/login' />
}

export default ProtectedRoute


