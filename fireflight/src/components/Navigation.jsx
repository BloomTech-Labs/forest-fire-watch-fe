import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "../context/contextProvider";
import { withRouter, NavLink, Link, Redirect } from "react-router-dom";
import logo from "../images/FF-logo.png";
import dashboard from "../images/dashboard.svg";
import dashboardAlt from "../images/active-dashboard.svg";
import maps from "../images/maps.svg";
import mapsAlt from "../images/active-maps.svg";

function Navigation({
  toggleAuthForms,
  toggleLoginStatus,
  toggleRegisterStatus,
  location
}) {
  const data = useContext(GlobalContext);
  const [menuToggle, setMenuToggle] = useState(false);

  useEffect(() => {
    let w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (w > 576) {
      setMenuToggle(true);
    }
  });

  const logout = e => {
    data.state.remote.logout();
  };

  const protec = ["/dashboard", "/address", "/maps", "/profile"];

  if (
    localStorage.getItem("token") == null &&
    protec.includes(location.pathname)
  ) {
    return <Redirect to="/" />;
  }

  return (
    <div className="nav-container">
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
                  <i className="fas fa-user-plus fa-lg" /> <br />
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
                  <i className="fas fa-user-check fa-lg" /> <br />
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
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </div>
              </React.Fragment>
            )}
          </div>
        ) : // end menu-container
        null}
      </div>
      {/* end dropdown-menu */}
    </div>
    // end nav-container
  );
}

export default withRouter(Navigation);
