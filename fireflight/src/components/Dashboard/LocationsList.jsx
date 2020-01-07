import React, {useContext, useState} from 'react'
import { UserDataContext } from '../../context/UserDataContext'
import { FireDataContext } from '../../context/FireDataContext'
import Geocoder from 'react-mapbox-gl-geocoder'


const LocationsList = props => {
  const {
    userLocations,
    deleteUserLocation,
    history,
    receiveSMS,
    receivePush
  } = props

  const {
    getCoordinates,
    saveInputLocation
  } = useContext(FireDataContext)

  const {updateTextAlerts, userDataState} = useContext(UserDataContext)
  const [isEditing, setIsEditing] = useState(false)
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')

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


  return (
    <div className="locations-info">
      <h3>Saved Locations</h3>
      <table className="locations-table">
        <thead>
          <tr className="table-row">
            <th className="locations-header">Address</th>
            <th className="locations-header">Radius</th>
            <th className="locations-header">Alerts</th>
          </tr>
        </thead>

        <tbody>
          {userLocations.map((loc, index) => (
            <tr className="table-row" key={index + loc.radius}>
              <td className="table-data address-field">
                {loc.address}
              {!isEditing ?               
                ( <>
                  <div>{loc.address} </div> 
                  
                  </>
                )
                : 
                (<div className="profile-field-container">
                  <form onSubmit={handleSubmit}>
                    <label>Address</label>
                    <Geocoder
                      {...mapAccess}
                      queryParams={queryParams}
                      hideOnSelect={true}
                      viewport={viewport}
                      onSelected={onSelected}
                      updateInputOnSelect={true}
                      limit={3}
                      value={address}
                    />
                    </form>
                  {/* <input
                    type="text"
                    placeholder="Enter your new address"
                    className="profile-email is-editing-input"
                    name="newAddress"
                    onChange={e => setNewAddress(e.target.value)}
                  /> */}
                   
                </div>
               )}
              </td>
              <td className="table-data radius-field">{loc.radius} mi</td>
              <td className="table-data notifications-field">                
                {/* {loc.notifications ? 'ON' : 'OFF'} */}
                {receiveSMS || receivePush ? 'ON' : 'OFF'}
              </td>
              <td>
              <i
                onClick={() => setIsEditing(true)}
                className="fas fa-pencil-alt edit-profile-icon"
              />
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
      <div className="locations-buttons">
        <button
          className="add-location-btn"
          onClick={() => history.push('/address')}
        >
          Add Location
        </button>
        <button
          className="return-to-map-btn"
          onClick={() => history.push('/home')}
        >
          Return To Map
        </button>
      </div>
    </div>
  )
}

export default LocationsList
