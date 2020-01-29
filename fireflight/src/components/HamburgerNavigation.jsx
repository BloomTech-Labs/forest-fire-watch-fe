import React, { useContext, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import clsx from 'clsx'
import ReactGA from 'react-ga'
import { GlobalContext } from '../context/contextProvider'
import MapLegend from '../components/MapLegend'
import Theme from '../styles/custom-theme'
import {
  makeStyles,
  useTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
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

const drawerWidth = 250
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200
    }
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  MapLegend: {
    marginTop: 'auto',
    marginBottom: 20
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
    width: drawerWidth,
    backgroundColor: '#262626'
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
  toggleRegisterStatus
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
    localStorage.removeItem('checkedItems')
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
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="primary"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar className="toolbar">
            <IconButton
              color="secondary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              size="medium"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="textSecondary" noWrap>
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
            <IconButton color="secondary" onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            <ListItem
              button
              key="Home"
              component={NavLink}
              onClick={handleDrawerClose}
              exact
              to="/"
              text-align="center"
            >
              <ListItemText secondary="Home" />
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
                    handleDrawerClose(true)
                  }}
                >
                  <ListItemText secondary="Signup" />
                </ListItem>
                <ListItem
                  button
                  className="menu-item inactive"
                  onClick={() => {
                    toggleAuthForms(true)
                    toggleRegisterStatus(false)
                    toggleLoginStatus(true)
                    ReactGA.modalview('/Login')
                    handleDrawerClose(true)
                  }}
                >
                  <ListItemText secondary="Login" />
                </ListItem>
              </>
            )}
            {localStorage.getItem('token') != null && (
              <>
                <ListItem
                  button
                  key="Profile"
                  onClick={handleDrawerClose}
                  component={NavLink}
                  to="/dashboard"
                  activeClassName="current"
                >
                  <ListItemText secondary="Profile" />
                </ListItem>
                <ListItem
                  button
                  key="Logout"
                  onClick={handleDrawerClose}
                  component={NavLink}
                  to="/"
                  onClick={logout}
                >
                  <ListItemText secondary="Logout" />
                </ListItem>
              </>
            )}
          </List>
          <Divider />
          <ListItem
            button
            key="Checklist"
            component={NavLink}
            to="/checklist"
            onClick={handleDrawerClose}
          >
            <ListItemText secondary="Checklist" />
          </ListItem>
          <span className={classes.MapLegend}>
            <MapLegend />
          </span>
        </Drawer>
      </MuiThemeProvider>
    </div>
  )
}
