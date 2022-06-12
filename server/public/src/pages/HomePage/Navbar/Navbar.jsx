import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {FaBars , FaTimes , FaBold } from 'react-icons/fa'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);
  
    window.addEventListener('resize', showButton);
  
    return (
      <>
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/login' className='navbar-logo' onClick={closeMobileMenu}>
              ESIHUB
              <i class='fab fa-typo3' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
            {click ? <FaTimes style={{color :'white'}}/> : <FaBars style={{color :'white'}}/> } 
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
              </li>
    
            </ul>
          </div>
        </nav>
      </>
    );
  }
  
  export default Navbar;
  