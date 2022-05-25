import React from 'react'
import Navbar from './Navbar/Navbar'
import background from './1.jpg'
import logo from '/assets/logoHome1.png'
import './HomePage.css'
import programmer from './Programmer-bro.svg'
const HomePage = () => {
  return (
    <div className='alll' style={{overflowY:scroll}}>
        <Navbar/>
        <form className='hellp'>
        <img src={logo} alt='cv chweya'  className="logoHome"></img>
        <p>esi hub the place where you can find all esi sbafk 
        </p>
        <img src={programmer} alt='cv chweya'  className="photo1"></img>

        </form>
        
    </div>
  )
}

export default HomePage