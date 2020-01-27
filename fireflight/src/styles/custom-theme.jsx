import { createMuiTheme } from '@material-ui/core/styles'
export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      main: '#e0e0e0'
    },
    secondary: {
      main: '#605D53'
    },
    background: {
      paper: '#e0e0e0'
    }
  },
  shape: {
    borderRadius: 4
  },
  typography: {
    fontSize: 20,
    fontFamily: ['Noto Sans'].join(',')
  }
})
