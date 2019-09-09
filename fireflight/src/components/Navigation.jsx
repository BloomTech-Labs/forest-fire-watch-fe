import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "../context/contextProvider";
import { withRouter, NavLink, Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/FF-logo.png";
import user from "../images/user.svg";
import dashboard from "../images/dashboard.svg";
import dashboardAlt from "../images/active-dashboard.svg";
import maps from "../images/maps.svg";
import mapsAlt from "../images/active-maps.svg";
import * as v from "../styles/vars";

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
    <NavContainer>
      <Logo>
        <img src={logo} alt="FireFlight Logo" />
      </Logo>
      <HamburgerMenu onClick={() => setMenuToggle(!menuToggle)}>
        <HamburgerMenuBar />
        <HamburgerMenuBar />
        <HamburgerMenuBar />
        {menuToggle ? (
          <MenuContainer>
            <NavLink exact to="/" activeClassName="current">
              <MenuItem>
                {/* Will be profile page later */}
                Home
              </MenuItem>
            </NavLink>

            {localStorage.getItem("token") == null && (
              <React.Fragment>
                <MenuItem
                  onClick={() => {
                    toggleAuthForms(true);
                    toggleRegisterStatus(true);
                    toggleLoginStatus(false);
                  }}
                >
                  <p>Register</p>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    toggleAuthForms(true);
                    toggleRegisterStatus(false);
                    toggleLoginStatus(true);
                  }}
                >
                  <p>Login</p>
                </MenuItem>
              </React.Fragment>
            )}
            {localStorage.getItem("token") != null && (
              <React.Fragment>
                <NavLink to="/dashboard" activeClassName="current">
                  <MenuItem data-temp="here">
                    {location.pathname.includes("/dashboard") ? (
                      <img src={dashboardAlt} alt="" />
                    ) : (
                      <img src={dashboard} alt="Dashboard Icon" />
                    )}
                    Dashboard
                  </MenuItem>
                </NavLink>
                {/* <MenuItem>
                  <NavLink to="/update" activeClassName="current">
                    Update
                  </NavLink>
                </MenuItem> */}
                <NavLink to="/address" activeClassName="current">
                  <MenuItem>
                    {location.pathname.includes("/address") ? (
                      <img src={mapsAlt} alt="Maps Icon" />
                    ) : (
                      <img src={maps} alt="Maps Icon" />
                    )}
                    Input Your Address
                  </MenuItem>
                </NavLink>
                {/* <NavLink to="/maps" activeClassName="current">
                  <MenuItem>
                    {location.pathname.includes("maps") ? (
                      <img src={mapsAlt} alt="Map Icon" />
                    ) : (
                      <img src={maps} alt="Map Icon" />
                    )}
                    View the Map
                  </MenuItem>
                </NavLink> */}
                <MenuItem>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </MenuItem>
              </React.Fragment>
            )}
          </MenuContainer>
        ) : null}
      </HamburgerMenu>
    </NavContainer>
  );
}

export default withRouter(Navigation);

const NavContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  position: sticky;
  top: 0;
  z-index: 4;
  background-color: ${v.AccentColorTransparency};
  ${v.tablet} {
    flex-direction: column;
    height: 100vh;
    justify-content: flex-start;
    width: 100px;
  }
  a.current {
    color: ${v.AccentColor};
    background-color: lightgrey;
  }
  @media (max-width: 576px) {
    background-image: linear-gradient(to bottom, #355C7D, #F67280 60%);
    height: 125px;
  }
`;

const Logo = styled.div`
  img {
    max-height: 65px;
    margin: 0;
  }
`;

const HamburgerMenu = styled.div`
  width: 25px;
  height: auto;
  padding: 5px;
  ${v.FontStack}
  ${v.ClearAnchors}
  background-color:${v.AccentColorTransparency};
  ${v.tablet}{
    padding:0;
    width:auto;
  }
`;

const HamburgerMenuBar = styled.div`
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 5px 0;
  ${v.tablet} {
    display: none;
  }
  @media (max-width: 576px) {
    
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  background-color: ${v.AccentColorTransparency};
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 2;

  ${v.tablet} {
    background-color: transparent;
    position: static;
    right: auto;
    margin: auto;
    text-align: center;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px;
  cursor: pointer;
  img {
    display: none;
    margin: auto;
    margin-bottom: 0.5rem;
  }
  ${v.tablet} {
    padding: auto;
    width: 80px;
    img {
      display: block;
    }
  }
`;
