import React from 'react'
import Popover from '@material-ui/core/Popover'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Theme from '../styles/custom-theme'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 65,
    left: 360,
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      top: 47,
      left: 310
    }
  },
  FormControlLabel: {
    marginLeft: theme.spacing(0)
  }
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

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // Toggle for AQI
  const [state, setState] = React.useState({
    AQIon: true
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked })
  }

  return (
    <div className={classes.root}>
      <i class="fa fa-chevron-circle-down fa-3x" onClick={handleClick}></i>
      <MuiThemeProvider theme={Theme}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <FormControlLabel
            className={classes.FormControlLabel}
            control={
              <Switch
                checked={state.checked}
                onChange={handleChange('AQIon')}
                value="AQIon"
              />
            }
            label="Air Quality Overlay"
          />
        </Popover>
      </MuiThemeProvider>
    </div>
  )
}
