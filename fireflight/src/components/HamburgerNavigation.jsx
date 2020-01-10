import React, { useContext, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import clsx from 'clsx'
import ReactGA from 'react-ga'
import Geocoder from 'react-mapbox-gl-geocoder'
import { FireDataContext } from '../context/FireDataContext'
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
const drawerWidth = 300
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
  toggleRegisterStatus
}) {
  const { getCoordinates } = useContext(FireDataContext)
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const data = useContext(GlobalContext)
  const token = process.env.REACT_APP_MAPBOX_TOKEN
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')
  const [viewport, setViewport] = useState({
    latitude: 34.377566,
    longitude: -113.144528,
    zoom: 4
  })
  const queryParams = {
    country: 'us'
  }
  const mapAccess = {
    mapboxApiAccessToken: token
  }
  const [location, setLocation] = useState([])
  const onSelected = (viewport, item) => {
    setAddress(item.place_name)
    setLocation(item.center)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (address) {
      getCoordinates(address, radius)
      localStorage.setItem('address', address)
      localStorage.setItem('radius', radius)
    }
    setViewport({
      ...viewport,
      latitude: location[1],
      longitude: location[0],
      width: '100vw',
      height: '100vh',
      zoom: 8,
      transitionDuration: 500
    })
    ReactGA.event({
      category: 'Fire search',
      action: 'Searched for fire'
    })
    // setAddress('') // doesn't reset address because of the special Geocoder library
  }
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
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="primary"
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
              size="medium"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" noWrap className="appBarTitle">
              Wildfire Watch
            </Typography>
            <form onSubmit={handleSubmit} className="map-form-container">
              <Geocoder
                {...mapAccess}
                viewport={viewport}
                queryParams={queryParams}
                hideOnSelect={true}
                onSelected={onSelected}
                updateInputOnSelect={true}
                limit={3}
              />
              <input
                className="radius-input"
                type="number"
                name="Radius"
                placeholder="mi"
                value={radius}
                onChange={e => setRadius(e.target.value)}
              />
              <div className="search-btn">
                <i class="fas fa-search fa-2x" onClick={handleSubmit}></i>
              </div>
            </form>
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
            <text className="appBarTitleMobile">Wildfire Watch</text>
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
            <ListItem
              button
              key="Home"
              component={NavLink}
              exact
              to="/"
              text-align="center"
            >
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
            <ListItem button key="Checklist" component={NavLink} to="/checklist">
          <ListItemText primary="Checklist" />
        </ListItem>
          <MapLegend />
        </Drawer>
      </MuiThemeProvider>
    </div>
  )
}