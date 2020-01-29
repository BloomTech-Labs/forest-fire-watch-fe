import React, { useState, useEffect } from 'react'
import fireIcon from '../images/fireIcon.svg'
import exclamationMark from '../images/alert.png'
import locationIcon from '../images/locationIcon.svg'
import locationIconBlue from '../images/locationIconBlue.svg'
import mapLegend from '../images/mapLegend.svg'

const MapLegend = () => {
  return (
    <div className="legend-container">
      <div className="legend-header">
        <h4 className="legend-title">Map Legend</h4>
      </div>

      <div>
        <span className="legend-item">
          <img
            src={locationIcon}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: 'translate(0px, 5px)' }}
            alt="Searched location"
          />
          <h5 className="legend-text">Your searched location</h5>
        </span>
        <span className="legend-item">
          <img
            src={locationIconBlue}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: 'translate(0px, 5px)' }}
            alt="Saved location"
          />
          <h5 className="legend-text">Your saved locations</h5>
        </span>
        <span className="legend-item">
          <img
            src={fireIcon}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: 'translate(0px, 5px)' }}
            alt="Active Fire"
          />
          <h5 className="legend-text">Active Fire</h5>
        </span>
        <span className="legend-item">
          <img
            src={exclamationMark}
            height="20"
            width="20"
            style={{ zIndex: 5, transform: 'translate(0px, 5px)' }}
            alt="Fire within radius"
          />
          <h5 className="legend-text">Fire Within Radius </h5>
        </span>
        {/* <p className="legend-info">
          <em>Location markers</em> can be clicked. There are actions available on the
          <em> temporary location marker</em> that will allow you to save that location to
          your profile. Once saved, you can choose to receive alerts for that
          location and adjust the alert radius.
        </p> */}
      </div>
    </div>
  )
}

export default MapLegend
