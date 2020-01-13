import React, { useState, useContext, useEffect } from 'react'
import { FireDataContext } from '../context/FireDataContext'
import Geocoder from 'react-mapbox-gl-geocoder'

function Address(props) {
  const {
    getCoordinates,
    // saveLocationMarker,
    saveInputLocation
  } = useContext(FireDataContext)
  // const addressContext = useContext(AddressContext);

  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')
  //   const [id, setId] = useState(undefined)
  //   const [viewport, setViewport] = useState({})

  const viewport = {}

  useEffect(() => {}, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (address) {
      getCoordinates(address, radius, true)
      // saveLocationMarker() // can't call this b/c the function is taking in address/radius from another piece of data specific to the markers
      // addressContext.saveAddress(address, radius);
      saveInputLocation(address, location, radius)
    }
    props.history.push(`/dashboard`)
  }

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

  return (
    <React.Fragment>
      <div className="addlocation-wrapper">
        <h2>Add Location</h2>
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
          <div className="radius-wrapper">
            <label>Radius</label>
            <div className="radius-info">
              <input
                type="number"
                name="Radius"
                placeholder="mi"
                value={radius}
                className="radius-input"
                onChange={e => setRadius(e.target.value)}
              />
              <p className="radius-text">
                Choose the miles from this location that you wish to be notified
                of fires within.
              </p>
            </div>
          </div>
          <button className="default-btn">Save Location</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Address
