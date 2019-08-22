import React, { useState, useEffect, useContext } from "react";
import FireContext from "../context/contextProvider";
import { withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  const [menuToggle, setMenuToggle] = useState(false);

  const data = useContext(FireContext);
  return (
    <NavContainer>
      <Logo>LOGO</Logo>
      <HamburgerMenu onClick={() => setMenuToggle(!menuToggle)}>
        <HamburgerMenuBar />
        <HamburgerMenuBar />
        <HamburgerMenuBar />
        {menuToggle ? (
          <MenuContainer>
            <MenuItem>
              <NavLink to="/" activeClassName="current">
                Home
              </NavLink>
            </MenuItem>

            {data.token == null && (
              <React.Fragment>
                <MenuItem onClick={() => console.log("register")}>
                  <NavLink to="/register" activeClassName="current">
                    Register
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/login" activeClassName="current">
                    Login
                  </NavLink>
                </MenuItem>
              </React.Fragment>
            )}
            {data.token != null && (
              <React.Fragment>
                <MenuItem>
                  <NavLink to="/update" activeClassName="current">
                    Home
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/logout" activeClassName="current">
                    Logout
                  </NavLink>
                </MenuItem>
              </React.Fragment>
            )}
          </MenuContainer>
        ) : null}
      </HamburgerMenu>
    </NavContainer>
  );
}

export default Navigation;

const NavContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  margin-bottom: 25px;
`;

const Logo = styled.h3``;

const HamburgerMenu = styled.div`
  width: 25px;
  height: auto;
  padding: 5px;
`;

const HamburgerMenuBar = styled.div`
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 5px 0;
`;

const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 10px;
`;

// user logs in ->
// user is presented with address form if logging in first time
// Address form can be accessed and edited through menu
// If not first time logging in, user is presented with the dashboard
// Dashboard shows a map
// There is an indicator on the map of the user's location
// There are indicators on the map of wildfires in area
// The user is notified of wildfires that are in close range.
