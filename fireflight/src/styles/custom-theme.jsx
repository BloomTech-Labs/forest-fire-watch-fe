import { createMuiTheme } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
export default createMuiTheme({
  palette: {
    primary: {
      main: '#262626'
    },
    secondary: {
      main: '#e0e0e0'
    },
    background: {
      paper: '#e0e0e0'
    },
    text: {
      secondary: '#e0e0e0'
    },
    divider: '#343333'
  },
  shape: {
    borderRadius: 4
  },
  typography: {
    fontSize: 20,
    fontFamily: ['Noto Sans'].join(',')
  }
})
