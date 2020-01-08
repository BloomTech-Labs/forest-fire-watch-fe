import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FireDataContext } from '../../context/FireDataContext'
import { UserDataContext } from '../../context/UserDataContext'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddressModal(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {updateTextAlerts, userDataState} = useContext(UserDataContext)
  const [isEditing, setIsEditing] = useState(false)
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')

  const {
    getCoordinates,
    saveInputLocation,
    updateUserLocations
  } = useContext(FireDataContext)

  const queryParams = {
    country: 'us'
  }
  const mapAccess = {
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN
  }
  const [location, setLocation] = useState([])

  const onSelected = (viewport, item) => {
    setAddress(item.place_name)
    setLocation(item.center)
  }

  const viewport = {}
  
  const changeAddress = () => {

  }

  const handleSubmit = e => {
    e.preventDefault()
    if (address) {
      getCoordinates(address, radius, true)
      saveInputLocation(address, location, radius)
    }
    props.history.push(`/dashboard`)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}