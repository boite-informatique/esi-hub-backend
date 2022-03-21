import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
    <h1>Home</h1>
    <h3>Wecome to Esi-Sba</h3>
    <Link to="/login" className='btn'><button>  click to Login </button></Link>
    </div>
  )
}

export default Home