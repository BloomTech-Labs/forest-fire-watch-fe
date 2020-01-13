// import React, { useState, useEffect, useContext } from 'react'

// import { GlobalContext } from '../context/contextProvider'
// import { withRouter, NavLink, Link, Redirect } from 'react-router-dom'
// import ReactGA from 'react-ga'

// //Navigation isn't being rendered anymore, We moved all functionality to HamburgerNavigation

// function Navigation({
//   toggleAuthForms,
//   toggleLoginStatus,
//   toggleRegisterStatus,
//   location
// }) {
//   const data = useContext(GlobalContext)
//   const [menuToggle, setMenuToggle] = useState(false)

//   useEffect(() => {
//     let w = Math.max(
//       document.documentElement.clientWidth,
//       window.innerWidth || 0
//     )
//     if (w > 0) {
//       setMenuToggle(true) //sets menuToggle to be on all the time at any size
//     }
//   })

//   const logout = e => {
//     data.state.remote.logout()
//     ReactGA.event({
//       category: 'User',
//       action: 'Logged out'
//     })
//   }

//   const protect = ['/dashboard', '/address', '/maps', '/profile']

//   if (
//     localStorage.getItem('token') == null &&
//     protect.includes(location.pathname)
//   ) {
//     return <Redirect to="/" />
//   }

//   return (
//     <div className="nav-container">
//       <NavLink exact to="/" activeClassName="current">
//         <div className="menu-item">Home</div>
//       </NavLink>

//       {localStorage.getItem('token') == null && (
//         <React.Fragment>
//           <div
//             className="menu-item inactive"
//             onClick={() => {
//               toggleAuthForms(true)
//               toggleRegisterStatus(false)
//               toggleLoginStatus(true)
//               ReactGA.modalview('/Login')
//             }}
//           >
//             Sign In
//           </div>
//           <div
//             className="menu-item inactive"
//             onClick={() => {
//               toggleAuthForms(true)
//               toggleRegisterStatus(true)
//               toggleLoginStatus(false)
//               ReactGA.modalview('/Register')
//             }}
//           >
//             Sign Up
//           </div>
//         </React.Fragment>
//       )}
//       {localStorage.getItem('token') != null && (
//         <React.Fragment>
//           <NavLink to="/dashboard" activeClassName="current">
//             <div className="menu-item" data-temp="here">
//               Profile
//             </div>
//           </NavLink>
//           {/* <NavLink to="/address" activeClassName="current">
// 						<div className="menu-item"> Input Your Address</div>
// 					</NavLink> */}
//           {/* <div className="menu-item"> */}
//           <NavLink to="/" onClick={logout}>
//             <div className="menu-item" data-temp="here">
//               Logout
//             </div>
//           </NavLink>
//           {/* </div> */}
//         </React.Fragment>
//       )}
//     </div>
//   )
// }

// export default withRouter(Navigation)
