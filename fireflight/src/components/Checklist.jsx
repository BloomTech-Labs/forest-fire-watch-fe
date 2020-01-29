import React from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Theme from '../styles/custom-theme'
import {
  makeStyles,
  useTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '0%',
    marginLeft: '5%',
    height: '100%'
  }
}))

const checklistItems = [
  'Have at least 1/2 tank of gas',
  '1 gallon water per person per day',
  'Non Perishable food',
  'Non electric can opener',
  'Insurance Card',
  'Identification',
  'Passports',
  'Deed to property',
  'Prescription Medication',
  'Flashlight',
  'Battery powered Radio with extra batteries',
  'Cash',
  'Extra set of keys (car, house)',
  'Glasses, including extra sets',
  'Family members, animals',
  'Computers',
  'Photos'
]

export default function CheckboxList(props) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([])

  const checkedItemsString = localStorage.getItem('checkedItems')

  React.useEffect(() => {
    if (localStorage.getItem('checkedItems')) {
      const checkedItems = checkedItemsString.split(',')
      setChecked(checkedItems)
    }
  }, [])

  const handleToggle = checklistItems => e => {
    const currentIndex = checked.indexOf(checklistItems)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(checklistItems)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    localStorage.setItem('checkedItems', newChecked)
  }

  return (
    <div className="checklistContainer">
      <h5
        className="map-button-checklist"
        onClick={() => props.history.push('/home')}
      >
        <i
          class="fas fa-angle-left"
          onClick={() => props.history.push('/home')}
        ></i>
        Map
      </h5>
      <List className={classes.root}>
        <MuiThemeProvider theme={Theme}>
          <Typography variant="h5" className="checklistTitle">
            Emergency Evacuation Checklist
          </Typography>
          {checklistItems.map(checklistItem => {
            const labelId = `checkbox-list-label-${checklistItem}`

            return (
              <ListItem
                key={checklistItem}
                role={undefined}
                dense
                button
                onClick={handleToggle(checklistItem)}
              >
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    edge="start"
                    checked={checked.indexOf(checklistItem) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={` ${checklistItem}`} />
              </ListItem>
            )
          })}
        </MuiThemeProvider>
      </List>
    </div>
  )
}
