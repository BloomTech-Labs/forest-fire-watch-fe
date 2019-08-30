import React, { useState, useEffect, useContext } from "react";
import { FireContext } from "../context/contextProvider";
import { withRouter, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../images/fireIcon.png'
import user from '../images/user.svg'
import dashboard from '../images/dashboard.svg'
import dashboardAlt from '../images/active-dashboard.svg'
import maps from '../images/maps.svg'
import mapsAlt from '../images/active-maps.svg'
import * as v from '../styles/vars'

function Navigation({
  toggleAuthForms,
  toggleLoginStatus,
  toggleRegisterStatus,
  location
}) {
  const data = useContext(FireContext);
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
                  <NavLink to='/dashboard' activeClassName="current">
                    <MenuItem data-temp="here">
                        {location.pathname.includes("/dashboard") ?
                            <img src={dashboardAlt} alt=""/>
                          :
                            <img src={dashboard} alt="Dashboard Icon"/>
                        }
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
                    {location.pathname.includes("/address") ?
                          <img src={mapsAlt} alt="Maps Icon"/>
                        :
                          <img src={maps} alt="Maps Icon"/>
                    }
                    Input Your Address
                  </MenuItem>
                </NavLink>
                <NavLink to="/maps" activeClassName="current">
                    <MenuItem>
                      {location.pathname.includes('maps')?
                        <img src={mapsAlt} alt="Map Icon"/>
                        :
                        <img src={maps} alt="Map Icon"/>
                      }
                      View the Map.
                    </MenuItem>
                </NavLink>
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
    background-color:transparent;
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
`;

const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${v.AccentColorTransparency};
  z-index: 2;
  ${v.tablet} {
    position: static;
    right: auto;
    margin: auto;
    text-align: center;
    background-color: transparent;
  }
`;

const MenuItem = styled.div`
  padding: 10px;
  img {
    display: none;
    margin: auto;
    margin-bottom: 0.5rem;
  }
  ${v.tablet} {
    padding: auto;
    img {
      display: block;
    }
  }
`;
