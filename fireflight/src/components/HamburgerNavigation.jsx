import React, { useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import clsx from 'clsx'
import ReactGA from 'react-ga'
import { GlobalContext } from '../context/contextProvider'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MapLegend from '../components/MapLegend'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

export default function PersistentDrawerLeft({
  toggleAuthForms,
  toggleLoginStatus,
  toggleRegisterStatus,
  location
}) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const data = useContext(GlobalContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const logout = e => {
    data.state.remote.logout()
    ReactGA.event({
      category: 'User',
      action: 'Logged out'
    })
  }

  const protect = ['/dashboard', '/address', '/maps', '/profile']

  if (
    localStorage.getItem('token') == null &&
    protect.includes(window.location.pathname)
  ) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Wildfire Watch
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          <ListItem button key="Home" component={NavLink} exact to="/">
            <ListItemText primary="Home" />
          </ListItem>
          {localStorage.getItem('token') == null && (
            <>
              <ListItem
                button
                className="menu-item inactive"
                onClick={() => {
                  toggleAuthForms(true)
                  toggleRegisterStatus(true)
                  toggleLoginStatus(false)
                  ReactGA.modalview('/Register')
                }}
              >
                <ListItemText primary="Signup" />
              </ListItem>
              <ListItem
                button
                className="menu-item inactive"
                onClick={() => {
                  toggleAuthForms(true)
                  toggleRegisterStatus(false)
                  toggleLoginStatus(true)
                  ReactGA.modalview('/Login')
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
          {localStorage.getItem('token') != null && (
            <>
              <ListItem
                button
                key="Profile"
                component={NavLink}
                to="/dashboard"
                activeClassName="current"
              >
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                key="Logout"
                component={NavLink}
                to="/"
                onClick={logout}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
          {/* {['Home', 'Signup', 'Login'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
        <Divider />
        <MapLegend />
      </Drawer>
    </div>
  )
}
