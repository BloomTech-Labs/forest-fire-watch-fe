import React, {useContext, useState} from 'react'
import { UserDataContext } from '../../context/UserDataContext'
import { FireDataContext } from '../../context/FireDataContext'
import Geocoder from 'react-mapbox-gl-geocoder'
import AddressModal from './UpdateAddressModal'


const LocationsList = props => {
  const {
    userLocations,
    deleteUserLocation,
    history,
    receiveSMS,
    receivePush,
    phone
  } = props

  const {
    getCoordinates,
    saveInputLocation,
    
  } = useContext(FireDataContext)

  const {updateTextAlerts} = useContext(UserDataContext)

  

  const [addressIndex, setAddressIndex] = useState()
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleNotifications = () => {
    if (phone) {
      return updateTextAlerts(!receiveSMS)
  }
} 
 


  return (
    <div className="locations-info">
      <h3 className='table-title'>Saved Locations
      <i class="fas fa-plus" fa-1x 
      onClick={() => props.history.push('/address')}></i>
      </h3>
      <table className="locations-table">
        <thead>
          <tr className="table-row">
            <th className="locations-header">Address</th>
            <th className="locations-header">Radius</th>
            <th className="locations-header alert-header">Alerts            
            <div className="notif-box">              
              <div className="checkbox-wrapper">
                <input
                  className="checkbox"
                  id="checkbox1"
                  type="checkbox"
                  onChange={() => {                    
                    toggleNotifications()
                  }}
                  checked={receiveSMS}
                />
                  <label className="checkbox-label" htmlFor="checkbox1" />
              </div>
            </div>
            <p>receive text alerts </p>
            </th>
            <th className='locations-header'>Edit</th>
          </tr>
        </thead>

        <tbody>
          {userLocations.map((loc, index) => (
            <tr className="table-row" key={index + loc.radius}>
              <td className="table-data address-field"> {loc.address}</td>
              <td className="table-data radius-field">{loc.radius} mi</td>
              <td className="table-data notifications-field">       
                { receiveSMS ? 'ON' : 'OFF' }
              </td>
              <td className='icon-container table-data'>
                <i
                  onClick={() => {setOpen(true); setAddressIndex(index)}}
                  className="fas fa-pencil-alt edit-profile-icon"
                />
                {open && <AddressModal handleClose={handleClose} open={open} address={loc.address} radius={loc.radius} id={loc.id} index={addressIndex} setOpen={setOpen} />}
                <div
                  className="delete-location-btn"
                  onClick={() => deleteUserLocation(loc.id)}
                >
                  x
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<div className="locations-buttons"> and Add Location button to be deleted after redesign.  */}
      
    </div>
  )
}

export default LocationsList
