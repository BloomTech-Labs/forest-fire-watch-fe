import React, { useState, useEffect, useContext } from 'react';

import { GlobalContext } from '../context/contextProvider';
import { withRouter, NavLink, Link, Redirect } from 'react-router-dom';

function Navigation({ toggleAuthForms, toggleLoginStatus, toggleRegisterStatus, location }) {
	const data = useContext(GlobalContext);
	const [ menuToggle, setMenuToggle ] = useState(false);

	useEffect(() => {
		let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (w > 0) {
			setMenuToggle(true); //sets menuToggle to be on all the time at any size
		}
	});

	const logout = (e) => {
		data.state.remote.logout();
	};

	const protec = [ '/dashboard', '/address', '/maps', '/profile' ];

	if (localStorage.getItem('token') == null && protec.includes(location.pathname)) {
		return <Redirect to="/" />;
	}

	return (
		<div className="nav-container">
			<NavLink exact to="/" activeClassName="current">
				<div className="menu-item">Home</div>
			</NavLink>

			{localStorage.getItem('token') == null && (
				<React.Fragment>
					<div
						className="menu-item inactive"
						onClick={() => {
							toggleAuthForms(true);
							toggleRegisterStatus(false);
							toggleLoginStatus(true);
						}}
					>
						Sign In
					</div>
					<div
						className="menu-item inactive"
						onClick={() => {
							toggleAuthForms(true);
							toggleRegisterStatus(true);
							toggleLoginStatus(false);
						}}
					>
						Sign Up
					</div>
				</React.Fragment>
			)}
			{localStorage.getItem('token') != null && (
				<React.Fragment>
					<NavLink to="/dashboard" activeClassName="current">
						<div className="menu-item" data-temp="here">
							} My Profile
						</div>
					</NavLink>
					<NavLink to="/address" activeClassName="current">
						<div className="menu-item">} Input Your Address</div>
					</NavLink>
					<div className="menu-item">
						<NavLink to="/" onClick={logout}>
							Logout
						</NavLink>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default withRouter(Navigation);
