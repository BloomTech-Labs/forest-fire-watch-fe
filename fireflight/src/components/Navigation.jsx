import React, { useState, useEffect, useContext } from "react";
import FireContext from "../context/contextProvider";
import { withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  const [menuToggle, setMenuToggle] = useState(false);
  const data = useContext(FireContext);
  return (
    <NavContainer>
      <HamburgerMenu onClick={() => setMenuToggle(!menuToggle)}>
        <HamburgerMenuBar />
        <HamburgerMenuBar />
        <HamburgerMenuBar />
        {menuToggle ? (
          <MenuContainer>
            <NavLink to="/" activeClassName="current">
              Home
            </NavLink>
            {data.token == null && (
              <React.Fragment>
                <NavLink to="/register" activeClassName="current">
                  Register
                </NavLink>
                <NavLink to="/login" activeClassName="current">
                  Login
                </NavLink>
              </React.Fragment>
            )}
            {data.token != null && (
              <React.Fragment>
                <NavLink to="/update" activeClassName="current">
                  Home
                </NavLink>
                <NavLink to="/logout" activeClassName="current">
                  Logout
                </NavLink>
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
  display: flex;
  justify-content: space-between;
`;

const MenuContainer = styled.div``;

const HamburgerMenu = styled.div`
  width: auto;
  height: auto;
  padding: 5px;
`;

const HamburgerMenuBar = styled.div`
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 5px 0;
`;

// user logs in ->
// user is presented with address form if logging in first time
// Address form can be accessed and edited through menu
// If not first time logging in, user is presented with the dashboard
// Dashboard shows a map
// There is an indicator on the map of the user's location
// There are indicators on the map of wildfires in area
// The user is notified of wildfires that are in close range.
