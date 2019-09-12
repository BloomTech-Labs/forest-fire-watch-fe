import React from 'react'
import styled from "styled-components";
import './Header.css'
import Gravatar from './Gravatar'
import AccentColorTransparency from '../styles/vars'


const getUser = localStorage.getItem("name")
const userName = getUser[0].toUpperCase() + getUser.slice(1)

const Header = () => {
    if (localStorage.getItem("name") !== null) {
    return (
        <div className='navStyle'>
        <div className='logo'>
        <img className='LogoPic' src="https://www.fireflightapp.com/public/images/FF-logo.png"/>
        <p className='logoName'>FireFlight</p>
        </div>
        <div className='right'>
        <button className='button'>Input Adress</button>
        <button className='button'>Dashboard</button>        
        <button className='button'>Sign out</button>        
        <p className='userName'>Welcome, {userName}</p>
        {/* <Gravatar/> */}
        </div>
    </div>
        )
    } else {
        return (
            <div className='navStyle'>
            <img className='Logo' src="https://www.fireflightapp.com/public/images/FF-logo.png"/>
            
            <button className='button'>Sign up</button>
            <button className='button'>Login</button>        
    </div>        
        )
    }
}

export default Header;

