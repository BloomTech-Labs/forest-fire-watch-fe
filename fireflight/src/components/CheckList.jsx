import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Theme from '../styles/custom-theme'
import {
  makeStyles,
  useTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    paddingTop: '5%',
    marginLeft: '5%',
  },
}));

export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const handleToggle = () => {
    setChecked(true);
  };
  return (
    <List className={classes.root}>
      <ListItem primary="Single-line item" dense button onClick={handleToggle}>
        <ListItemIcon>
          <Checkbox edge="start" disableRipple />
        </ListItemIcon>
        <ListItemText primary="text" />
      </ListItem>
      <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Have at least 1/2 tank of gas" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="1 gallon water per person per day" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Non Perishable food" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Non electric can opener" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Insurance Card" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="ID, Passport" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Prescription Medication" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="First Aid kit" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Flashlight" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Battery powered radio with extra batteries" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Extra set of keys (house, car)" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Glasses, including extra sets" />
        </ListItem>
        <ListItem primary="Single-line item" dense button onClick={handleToggle}>
          <ListItemIcon>
            <Checkbox edge="start" disableRipple />
          </ListItemIcon>
          <ListItemText primary="Family members and animals" />
        </ListItem>
    </List>
  );
}