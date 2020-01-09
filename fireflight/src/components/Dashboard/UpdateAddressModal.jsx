import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FireDataContext } from '../../context/FireDataContext'
import { UserDataContext } from '../../context/UserDataContext'
import axiosWithAuth from '../../utils/axiosWithAuth'
import Geocoder from 'react-mapbox-gl-geocoder'


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
    // height: 350,
    width: 500
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
  const [location, setLocation] = useState([])

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
 

  const onSelected = (viewport, item) => {
    setAddress(item.place_name)
    setLocation(item.center)
  }

  const viewport = {}
  

  const handleSubmit = e => {
    e.preventDefault()
    if (address) {
      getCoordinates(address, radius, true)
      updateUserLocations(address, radius, newAddress.id)
      props.setOpen(false)
    }
    
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
          <div className='geocoder-modal-container'>
            <h1 id="transition-modal-title">Edit Address</h1>
            
            <label className='modal-label'>Address</label>
            <Geocoder
              {...mapAccess}
              queryParams={queryParams}
              hideOnSelect={true}
              viewport={viewport}
              onSelected={onSelected}
              updateInputOnSelect={true}
              limit={3}
              value={newAddress}
            />
            <div className="radius-wrapper">
              <label className='modal-label'>Radius</label>
              <div className="radius-info">
                <input
                  type="number"
                  name="Radius"
                  placeholder="mi"
                  value={newRadius}
                  className="radius-input"
                  onChange={e => setRadius(e.target.value)}
                />
                
              </div>
            </div>
          <button className="default-btn" onClick={handleSubmit}>Save Location</button>
           </div>     
          </div>
        </Fade>
      </Modal>
    </div>
  );
}