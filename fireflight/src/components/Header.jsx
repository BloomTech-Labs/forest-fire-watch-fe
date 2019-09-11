import React from 'react'
import styled from "styled-components";
import './Header.css'

const Header = () => {
    return (
    <div className='navStyle'>
    <img className='Logo' src="https://www.fireflightapp.com/public/images/FF-logo.png"/>
        <p>Welcome, {localStorage.getItem("name")}</p>
    </div>
    )
}

export default Header;

