import React, { useState, useEffect, useContext } from 'react'

<<<<<<< HEAD
import { GlobalContext } from "../context/contextProvider";
import { withRouter, NavLink, Link, Redirect } from "react-router-dom";
import logo from "../images/FF-logo2.png";
=======
import { GlobalContext } from '../context/contextProvider'
import { withRouter, NavLink, Link, Redirect } from 'react-router-dom'
import ReactGA from 'react-ga'
>>>>>>> 678866c8a1b26e227b25fa1998f81ad7686cc7fb

function Navigation({
  toggleAuthForms,
  toggleLoginStatus,
  toggleRegisterStatus,
  location
}) {
  const data = useContext(GlobalContext)
  const [menuToggle, setMenuToggle] = useState(false)

  useEffect(() => {
    let w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    if (w > 0) {
      setMenuToggle(true) //sets menuToggle to be on all the time at any size
    }
  })

  const logout = e => {
    data.state.remote.logout()
    ReactGA.event({
      category: 'User',
      action: 'Logged out'
    })
  }

  const protec = ['/dashboard', '/address', '/maps', '/profile']

  if (
    localStorage.getItem('token') == null &&
    protec.includes(location.pathname)
  ) {
    return <Redirect to="/" />
  }

  return (
    <div className="nav-container">
<<<<<<< HEAD
      <div className="brand">
        <img className="logo" src={logo} alt="FireFlight Logo" />
        <span className="logo-txt">FireFlight</span>
      </div>
      <div className="dropdown" onClick={() => setMenuToggle(!menuToggle)}>
        <div className="drop-btn">
          <i className="fas fa-plus-circle fa-2x" />
        </div>
        {menuToggle ? (
          <div className="dropdown-content">
            <NavLink exact to="/" activeClassName="current">
              <div className="menu-item">
                {/* Will be profile page/dashboard later */}
                <i className="fas fa-home fa-lg" />
                Home
              </div>
            </NavLink>

            {localStorage.getItem("token") == null && (
              <React.Fragment>
                <div
                  className="menu-item inactive"
                  onClick={() => {
                    toggleAuthForms(true);
                    toggleRegisterStatus(true);
                    toggleLoginStatus(false);
                  }}
                >
                  <i className="fas fa-user-plus fa-lg" /> 
                  Register
                </div>
                <div
                  className="menu-item inactive"
                  onClick={() => {
                    toggleAuthForms(true);
                    toggleRegisterStatus(false);
                    toggleLoginStatus(true);
                  }}
                >
                  <i className="fas fa-user-check fa-lg" />
                  Login
                </div>
              </React.Fragment>
            )}
            {localStorage.getItem("token") != null && (
              <React.Fragment>
                <NavLink to="/dashboard" activeClassName="current">
                  <div className="menu-item" data-temp="here">
                    {location.pathname.includes("/dashboard") ? (
                      <i className="fas fa-id-card fa-lg" />
                    ) : (
                      <i className="fas fa-id-card fa-lg" />
                    )}
                    My Profile
                  </div>
                </NavLink>
                {/* <div className="menu-item">
                  <NavLink to="/update" activeClassName="current">
                    Update
                  </NavLink>
                </div> */}
                <NavLink to="/address" activeClassName="current">
                  <div className="menu-item">
                    {location.pathname.includes("/address") ? (
                      <i className="far fa-map fa-lg" />
                    ) : (
                      <i className="far fa-map fa-lg" />
                    )}
                    Input Your Address
                  </div>
                </NavLink>
                {/* <NavLink to="/maps" activeClassName="current">
                  <div className="menu-item">
                    {location.pathname.includes("maps") ? (
                      <img src={mapsAlt} alt="Map Icon" />
                    ) : (
                      <img src={maps} alt="Map Icon" />
                    )}
                    View the Map
                  </div>
                </NavLink> */}
                <div className="menu-item">
                  <NavLink to="/" onClick={logout}>
                  <i className="fas fa-arrow-circle-left fa-lg" />
                    Logout
                  </NavLink>
                </div>
              </React.Fragment>
            )}
=======
      <NavLink exact to="/" activeClassName="current">
        <div className="menu-item">Home</div>
      </NavLink>

      {localStorage.getItem('token') == null && (
        <React.Fragment>
          <div
            className="menu-item inactive"
            onClick={() => {
              toggleAuthForms(true)
              toggleRegisterStatus(false)
              toggleLoginStatus(true)
              ReactGA.modalview('/Login')
            }}
          >
            Sign In
          </div>
          <div
            className="menu-item inactive"
            onClick={() => {
              toggleAuthForms(true)
              toggleRegisterStatus(true)
              toggleLoginStatus(false)
              ReactGA.modalview('/Register')
            }}
          >
            Sign Up
>>>>>>> 678866c8a1b26e227b25fa1998f81ad7686cc7fb
          </div>
        </React.Fragment>
      )}
      {localStorage.getItem('token') != null && (
        <React.Fragment>
          <NavLink to="/dashboard" activeClassName="current">
            <div className="menu-item" data-temp="here">
              Profile
            </div>
          </NavLink>
          {/* <NavLink to="/address" activeClassName="current">
						<div className="menu-item"> Input Your Address</div>
					</NavLink> */}
          {/* <div className="menu-item"> */}
          <NavLink to="/" onClick={logout}>
            <div className="menu-item" data-temp="here">
              Logout
            </div>
          </NavLink>
          {/* </div> */}
        </React.Fragment>
      )}
    </div>
  )
}

<<<<<<< HEAD
export default withRouter(Navigation);
=======
export default withRouter(Navigation)
>>>>>>> 678866c8a1b26e227b25fa1998f81ad7686cc7fb
