import React from 'react'

const ColorLegend = () => {

  const legendStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '100px',
    position: 'fixed',
    bottom: '50px',
    right: '30px',
  }

  const pStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    width: '25px'
  }

  return (
    <div className="color-legend" style={legendStyle}>
      <div id="cl-1" className="legend-item" style={{backgroundColor: "black", color: "white"}}>
        <p style={pStyle}>N/A</p>
      </div>
      <div id="cl-2" className="legend-item" style={{backgroundColor: "green"}}>
        <p style={pStyle}>0</p>
      </div>
      <div id="cl-3" className="legend-item" style={{backgroundColor: "#88DB57"}}>
        <p style={pStyle}>25</p>
      </div>
      <div id="cl-4" className="legend-item" style={{backgroundColor: "#FFF072"}}>
        <p style={pStyle}>50</p>
      </div>
      <div id="cl-5" className="legend-item" style={{backgroundColor: "yellow"}}>
        <p style={pStyle}>75</p>
      </div>
      <div id="cl-6" className="legend-item" style={{backgroundColor: "darkorange"}}>
        <p style={pStyle}>100</p>
      </div>
      <div id="cl-7" className="legend-item" style={{backgroundColor: "red", color: "white"}}>
        <p style={pStyle}>200</p>
      </div>
      <div id="cl-8" className="legend-item" style={{backgroundColor: "darkred", color: "white"}}>
        <p style={pStyle}>300</p>
      </div>
      <div id="cl-9" className="legend-item" style={{backgroundColor: "#660000", color: "white"}}>
        <p style={pStyle}>500</p>
      </div>
    </div>
  )
}

export default ColorLegend;