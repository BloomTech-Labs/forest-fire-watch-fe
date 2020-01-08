import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FireDataContext } from '../../context/FireDataContext'
import { UserDataContext } from '../../context/UserDataContext'
import axiosWithAuth from '../../utils/axiosWithAuth'


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
  
  const {updateTextAlerts, userDataState} = useContext(UserDataContext)
  const [isEditing, setIsEditing] = useState(false)
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')
  const [newRadius, setNewRadius] = useState()
  const [newAddress, setNewAddress] = useState()
  const {
      getCoordinates,
      saveInputLocation,
      updateUserLocations,
      getUserLocations,
      fireDataState
    } = useContext(FireDataContext)
  const { userLocations } = fireDataState 
  
    
  React.useEffect(() => {
        axiosWithAuth()
          .get('/locations')
          .then(res => {
            console.log('from modal GET', res.data)
            const addresses = res.data            
            console.log('current address in GET', addresses)
            setNewAddress(addresses[props.index].address)
            setNewRadius(addresses[props.index].radius)
          })
        
        console.log('from modal new address', newAddress, newRadius)
    
    console.log("from address modal", props.address, props.id, props.index)
  }, [])

  

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
  
  const onAddressChange = (e) => {
    setNewAddress(e.target.value)
  }

  const onRadiusChange = e => {
    setNewRadius(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (address) {
      getCoordinates(address, radius, true)
      saveInputLocation(address, location, radius)
    }
    props.history.push(`/dashboard`)
  }

  

  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h1 id="transition-modal-title">Edit Address</h1>
            <textarea cols='30' rows='10' type='text'  value={newAddress} onChange={onAddressChange} />
            <input type='number' value={newRadius} onChange={onRadiusChange} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}