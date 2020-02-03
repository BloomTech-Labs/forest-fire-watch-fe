import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL, { Popup, Source, Layer } from 'react-map-gl'
import MapDropDown from './MapDropDown'
import ColorLegend from './ColorLegend'
import styled from 'styled-components'
import { FireDataContext } from '../context/FireDataContext'
import Geocoder from 'react-mapbox-gl-geocoder'
import axios from 'axios'
import ReactGA from 'react-ga'
import { clusterLayer, clusterCountLayer, unclusteredPointLayer} from './AQmap'
import GeoJSON from 'geojson'
import { clusterLayer, clusterCountLayer } from './AQmap'
import 'mapbox-gl/dist/mapbox-gl.css'



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


  const [AQStations, setAQStations] = useState()
  const [AQData, setAQData] = useState()
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')
  const [popupRadius, setPopupRadius] = useState('')
  const [viewport, setViewport] = useState({
    latitude: 34.377566,
    longitude: -113.144528,
    zoom: 4
  })
  const [fireToggle, setFireToggle] = useState({ fireToggle: true })
  const [aqiToggle, setAqiToggle] = useState({ aqiToggle: false })

  

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

  useEffect(() => {
    ipAddress()
  }, [])
  //prompts the user for their permission to location and sets viewport
  //currently not useing due to geocoder issues related to having them both plugged in. IP address is very reliable and does not need any permissions.
  const geoControl = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('setting viewport using geolocation permission')
      setViewport({
        ...viewport,
        latitude: parseInt(position.coords.latitude),
        longitude: parseInt(position.coords.longitude),
        width: '100vw',
        height: '100vh',
        zoom: 8
      })
    })
  }

  // useEffect to set the AQI data
  useEffect(() => {
    axios
      .get(
        `https://appwildfirewatch.herokuapp.com/get_aqi_stations?lat=${viewport.latitude}&lng=${viewport.longitude}&distance=45`
      )
      .then(res => {
        setAQStations(res.data.data)
      })
      .catch(err => console.log('error from AQ stations', err))
  }, [])

  // Parse data from data science to geoJSON
  useEffect(() => {
    if (AQStations) {
      setAQData(GeoJSON.parse(AQStations, { Point: ['lat', 'lon'] }))
    }
  }, [AQStations])

  //Gets the users location based on the IP address of the client and sets the viewport
  const ipAddress = () => {
    axios
      .get(`${process.env.REACT_APP_ENV}users/ip-address`)
      .then(res => {
        if (res.data.status !== 'fail') {
          setViewport({
            ...viewport,
            latitude: res.data.lat,
            longitude: res.data.lon,
            width: '100vw',
            height: '100vh',
            zoom: 8
          })
        } else {
          console.log('going into else')
          setViewport({
            ...viewport,
            latitude: 34.377566,
            longitude: -113.144528,
            width: '100vw',
            height: '100vh',
            zoom: 4
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

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
      width: '100vw',
      height: '100vh',
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
          style={{
            height: 8,
            width: 110,
            fontSize: 14,
            margin: '0 10px 0 0'
          }}
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1.4rem'
      }}
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="public-container">
        <form onSubmit={handleSubmit} className="map-form-container">
          <Geocoder
            {...mapAccess}
            viewport={viewport}
            queryParams={queryParams}
            hideOnSelect={true}
            onSelected={onSelected}
            updateInputOnSelect={true}
            limit={4}
          />
          <i className="fas fa-search fa-2x" onClick={handleSubmit}></i>
        </form>
        <MapDropDown
          fireToggle={fireToggle}
          setFireToggle={setFireToggle}
          aqiToggle={aqiToggle}
          setAqiToggle={setAqiToggle}
        />
      </div>

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        width="100vw"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        mapStyle="mapbox://styles/astillo/ck1s93bpe5bnk1cqsfd34n8ap"
        // interactiveLayerIds={[clusterLayer.id]}
      >
        {AQData && aqiToggle.aqiToggle === true && (
          <Source type="geojson" data={AQData}>
            <Layer {...clusterLayer} data={AQData} />
            <Layer {...clusterCountLayer} data={AQData} />

            <ColorLegend />
          </Source>
        )}

        {fireToggle.fireToggle === true && allFireMarkers}
        {fireToggle.fireToggle === true && userLocalFireMarkers}
        {fireToggle.fireToggle === true && localFireMarkers}

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
