import React from 'react'
import Popover from '@material-ui/core/Popover'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { green } from '@material-ui/core/colors'
import Theme from '../styles/custom-theme'
import {
  makeStyles,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'

const GreenSwitch = withStyles({
  switchBase: {
    '&$checked + $track': {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {}
})(Switch)

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

export default function MapDropDown(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const {
    fireToggle,
    setFireToggle,
    aqiToggle,
    setAqiToggle
  } = props

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
    AQIon: false,
    Fireon: true
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked })
  }

  const changeFireToggle = () => {    
    const currentFireState = fireToggle.fireToggle
    setFireToggle({fireToggle: !currentFireState})     
  }
  const changeAQIToggle = () => {    
    const currentAqiState = aqiToggle.aqiToggle
    setAqiToggle({aqiToggle: !currentAqiState})     
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
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Typography
            variant="h5"
            noWrap
            align="center"
            className={classes.Typography}
          >
            Filters
          </Typography>
          <Box>
            <FormControlLabel
              className={classes.FormControlLabel}
              control={
                <GreenSwitch
                  checked={state.AQIon}
                  onChange={handleChange('AQIon')}
                  onClick={() => {                    
                    changeAQIToggle()                    
                   }}
                  value="AQIon"
                />
              }
              label="Air Quality"
            />
          </Box>
          <Box>
            <FormControlLabel
              className={classes.FormControlLabel}
              control={
                <GreenSwitch
                  checked={state.Fireon}
                  onChange={handleChange('Fireon')}
                  onClick={changeFireToggle}
                  value="AQIon"
                />
              }
              label="Wildfires"
            />
          </Box>
        </Popover>
      </MuiThemeProvider>
    </div>
  )
}
