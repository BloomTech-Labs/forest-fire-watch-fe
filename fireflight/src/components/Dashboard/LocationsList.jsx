import React from 'react'

const LocationsList = props => {
  const {
    userLocations,
    deleteUserLocation,
    history,
    receiveSMS,
    receivePush
  } = props

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
      <button
        className="add-location-btn"
        onClick={() => history.push('/address')}
      >
        Add Location
      </button>
    </div>
  )
}

export default LocationsList
