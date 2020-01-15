import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#e0e0e0'
    },
    secondary: {
      main: '#fafafa'
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
