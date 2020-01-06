import React, {useContext} from 'react'
import { UserDataContext } from '../../context/UserDataContext'


const LocationsList = props => {
  const {
    userLocations,
    deleteUserLocation,
    history,
    receiveSMS,
    receivePush
  } = props
  const {updateTextAlerts, userDataState} = useContext(UserDataContext)
  


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
              <td className="table-data address-field">{loc.address}</td>
              <td className="table-data radius-field">{loc.radius} mi</td>
              <td className="table-data notifications-field">
              <div className="notif-box">
                <div className="checkbox-wrapper">
                
                    <input
                      className="checkbox"
                      id="checkbox1"
                      type="checkbox"
                      onChange={() => {
                        updateTextAlerts(!receiveSMS)
                      }}
                      checked={receiveSMS}
                    />
                   <label className="address-checkbox" htmlFor="checkbox1" />          
               </div>
            </div>
                {/* {loc.notifications ? 'ON' : 'OFF'} */}
                {receiveSMS || receivePush ? 'ON' : 'OFF'}
              </td>
              <td>
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
