import React from 'react'
import Menu from '@material-ui/core/Menu'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Theme from '../styles/custom-theme'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    position: 'absolute',
    top: 65,
    left: 360
  },
  menu: {}
}))

export default function MapDropDown() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Controls menu open and close
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // Toggle for AQI
  const [state, setState] = React.useState({
    AQIon: true
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked })
  }

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={Theme}>
        <i class="fa fa-chevron-circle-down fa-3x" onClick={handleClick}></i>
        <Menu
          className={classes.menu}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange('AQIon')}
                value="AQIon"
              />
            }
            label="Air Quality Overlay"
          />
          <p>Line 2</p>
          <p>Line 3</p>
          <p>Line 4</p>
          <p>Line 5</p>
        </Menu>
      </MuiThemeProvider>
    </div>
  )
}
