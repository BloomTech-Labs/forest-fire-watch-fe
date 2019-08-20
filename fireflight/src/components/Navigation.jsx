import React,{useState,useEffect,useContext} from 'react'
import FireContext from '../context/contextProvider'
import {withRouter,NavLink} from 'react-router-dom'

function Navigation() {
    const data=useContext(FireContext)
    return (
        <nav>
            <NavLink to="/" activeClassName="current">
                Home
            </NavLink>
            {   
                data.token==null && 
                <React.Fragment>
                    <NavLink to="/register" activeClassName="current">
                        Register
                    </NavLink>
                    <NavLink to="/login" activeClassName="current">
                        Login
                    </NavLink>
                </React.Fragment>
            }{
                data.token!=null &&
                <React.Fragment>
                    <NavLink to="/update" activeClassName="current">
                        Home
                    </NavLink>  
                    <NavLink to="/danger" activeClassName="current">
                        Home
                    </NavLink>
                    <NavLink to="/logout" activeClassName="current">
                        Logout    
                    </NavLink>       
                </React.Fragment>
            }
        </nav>
    )
}

export default Navigation
