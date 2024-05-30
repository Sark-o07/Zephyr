import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/profile-icon2.png';
import nav_logo from '../../assets/nav-logo1.png';

export const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="" className='nav-logo'/>
        <img src={navProfile} alt="" className='nav-profile' />
    </div>
  )
}
