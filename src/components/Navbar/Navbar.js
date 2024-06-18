import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import './Navbar.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src="https://static.wixstatic.com/media/8a4e7a_aee93c579e0e451a814bad59864b14a9~mv2.webp/v1/fill/w_140,h_45,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Calfus%20logo.webp" alt="Calfus logo.webp" width="140" height="45" srcset="https://static.wixstatic.com/media/8a4e7a_aee93c579e0e451a814bad59864b14a9~mv2.webp/v1/fill/w_140,h_45,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Calfus%20logo.webp 1x, https://static.wixstatic.com/media/8a4e7a_aee93c579e0e451a814bad59864b14a9~mv2.webp/v1/fill/w_280,h_90,al_c,lg_1,q_80,enc_auto/Calfus%20logo.webp 2x" fetchpriority="high"></img>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar