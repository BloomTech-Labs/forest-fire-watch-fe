import React, { useState, useEffect, useContext } from "react";
import { FireContext } from "../context/contextProvider";
import { withRouter, NavLink, Link } from "react-router-dom";
import styled from "styled-components";

function Navigation({
  toggleAuthForms,
  toggleLoginStatus,
  toggleRegisterStatus
}) {
  const data = useContext(FireContext);
  const [menuToggle, setMenuToggle] = useState(false);

  const logout=e=>{
    data.state.remote.logout()
  }

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

            {localStorage.getItem('token') == null && (
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
            {localStorage.getItem('token') != null && (
              <React.Fragment>
                <MenuItem>
                  <NavLink to="/update" activeClassName="current">
                    Update
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/address" activeClassName="current">
                    Input Your Address
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
