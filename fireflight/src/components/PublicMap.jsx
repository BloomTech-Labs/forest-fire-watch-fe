import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL, { Popup } from 'react-map-gl'
import styled from 'styled-components'
import { FireDataContext } from '../context/FireDataContext'
import MapLegend from './MapLegend'
import Navigation from '../components/Navigation'
import Geocoder from 'react-mapbox-gl-geocoder'
import axios from 'axios'
import ReactGA from 'react-ga'

const token = process.env.REACT_APP_MAPBOX_TOKEN
ReactGA.pageview('/public-map')
const PublicMap = ({
  setShowAuthForms,
  setLoginFormStatus,
  setRegisterFormStatus
}) => {
  const {
    fireDataState,
    getCoordinates,
    closeSelectedMarker,
    deleteLocationMarker,
    saveLocationMarker,
    // toggleNotification,
    deleteUserLocation,
    updatePopupRadius
  } = useContext(FireDataContext)

  const {
    // publicMapViewport,
    allFireMarkers,
    publicCoordinatesMarker,
    localFireMarkers,
    selectedMarker,
    userLocationMarkers,
    userLocalFireMarkers,
    exclamationMarkers
  } = fireDataState

  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')
  const [popupRadius, setPopupRadius] = useState('')
  const [viewport, setViewport] = useState({
    latitude: 34.377566,
    longitude: -113.144528,
    width: '100vw',
    height: '100vh',
    zoom: 4
  })

  // Add event listener to window - close whatever pop-up is selected
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        closeSelectedMarker()
      }
    }
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
  //Gets the users location based on the IP address of the client and sets the viewport
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ENV}users/ip-address`)
      .then(res => {
        console.log(res.data)
        if (res.data.status !== 'fail') {
          console.log('setting viewport')
          setViewport({
            latitude: res.data.lat,
            longitude: res.data.lon,
            width: '100vh',
            height: '100vh',
            zoom: 8
          })
        } else {
          console.log('going into else')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  //prompts the user for their permission to location and sets viewport
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('setting viewport using geolocation permission')
      setViewport({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        width: '100vh',
        height: '100vh',
        zoom: 8
      })
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (address) {
      getCoordinates(address, radius)
      localStorage.setItem('address', address)
      localStorage.setItem('radius', radius)
    }
    setViewport({
      ...viewport,
      latitude: location[1],
      longitude: location[0],
      zoom: 8,
      transitionDuration: 500
    })
    ReactGA.event({
      category: 'Fire search',
      action: 'Searched for fire'
    })
    // setAddress('') // doesn't reset address because of the special Geocoder library
  }

  const tempLocationPopup = (
    <div className="save-location-modal">
      <p
        style={{
          fontWeight: '300',
          fontSize: '12px'
        }}
      >
        Want to save this location?
      </p>
      <button
        style={{
          color: '#66BBF0',
          backgroundColor: 'white'
        }}
        className="save-location-btn"
        onClick={e => {
          const token = localStorage.getItem('token')
          if (token) {
            saveLocationMarker()
            deleteLocationMarker()
          } else {
            setShowAuthForms(true)
            setRegisterFormStatus(false)
            setLoginFormStatus(true)
          }
        }}
      >
        Click Here
      </button>
    </div>
  )

  const savedLocationPopup = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span
        style={{
          marginBottom: '6px',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '14px',
          maxWidth: '25rem'
        }}
      >
        {selectedMarker[2]}
      </span>
      <b />
      <span style={{ marginBottom: '6px', textAlign: 'center' }}>
        {' '}
        Current Radius: {selectedMarker[3]}mi{' '}
      </span>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormRadiusInput
          type="text"
          name="PopupRadius"
          placeholder="miles"
          value={popupRadius}
          onChange={e => setPopupRadius(e.target.value)}
          style={{ height: 8, width: 110, fontSize: 14, margin: '0 10px 0 0' }}
        />
        <button
          onClick={() => {
            updatePopupRadius(popupRadius)
            setPopupRadius('')
          }}
          style={{
            marginTop: 3,
            height: 24,
            backgroundColor: '#FC8D43',
            color: 'white'
          }}
        >
          Set Radius
        </button>
      </div>
      <button
        onClick={() => {
          deleteUserLocation(selectedMarker[5])
        }}
        style={{
          marginTop: 6,
          backgroundColor: 'white',
          color: '#66BBF0'
        }}
      >
        Delete this pin
      </button>
    </div>
  )

  const fireLocationPopup = (
    <div
      style={{ display: 'flex', flexDirection: 'column', fontSize: '1.4rem' }}
    >
      {selectedMarker[7]}
    </div>
  )

  const queryParams = {
    country: 'us'
  }
  const mapAccess = {
    mapboxApiAccessToken: token
  }
  const [location, setLocation] = useState([])

  const onSelected = (viewport, item) => {
    setAddress(item.place_name)
    setLocation(item.center)
  }

  console.log('exclamations', exclamationMarkers)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MapLegend />
      <div className="public-container">
        <Navigation
          toggleAuthForms={setShowAuthForms}
          toggleLoginStatus={setLoginFormStatus}
          toggleRegisterStatus={setRegisterFormStatus}
        />
        <form onSubmit={handleSubmit} className="map-form-container">
          <label className="map-form-text">
            Enter the address and radius you wish to check fire proximity to.
          </label>
          <Geocoder
            {...mapAccess}
            viewport={viewport}
            queryParams={queryParams}
            hideOnSelect={true}
            onSelected={onSelected}
            updateInputOnSelect={true}
            limit={3}
          />
          <input
            className="radius-input"
            type="number"
            name="Radius"
            placeholder="mi"
            value={radius}
            onChange={e => setRadius(e.target.value)}
          />
          <button className="form-btn">Search</button>
          {localStorage.getItem('token') == null && (
            <React.Fragment>
              <label className="signup-form-text">
                to save addresses and receive notifications
              </label>
              <button
                className="signup-btn"
                onClick={() => {
                  setShowAuthForms(true)
                  setLoginFormStatus(false)
                  setRegisterFormStatus(true)
                }}
              >
                Sign Up
              </button>
            </React.Fragment>
          )}
        </form>
        {/* End Form Container */}
      </div>

      <ReactMapGL
        {...viewport}
        width="100%"
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        mapStyle="mapbox://styles/astillo/ck1s93bpe5bnk1cqsfd34n8ap"
      >
        {allFireMarkers}
        {userLocalFireMarkers}
        {localFireMarkers}
        {userLocationMarkers}
        {publicCoordinatesMarker}
        {exclamationMarkers}
        {selectedMarker.length > 0 ? (
          <Popup
            closeOnClick={false}
            anchor="top"
            latitude={selectedMarker[0]}
            longitude={selectedMarker[1]}
            onClose={() => {
              closeSelectedMarker()
            }}
          >
            {selectedMarker[4] === 'savedLocation' && savedLocationPopup}
            {selectedMarker[4] === 'tempLocation' && tempLocationPopup}
            {selectedMarker[4] === 'fireLocation' && fireLocationPopup}
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  )
}

export default PublicMap

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`

const FormRadiusInput = styled.input`
  width: 150px;
  margin: 25px 17.5px 5px 10px;
  padding: 10px;
  font-size: 1em;
  background-color: white;
  border-radius: 5px;
  border: solid 1px black;
  @media (max-width: 576px) {
    width: 200px;
    padding: 8px;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`
