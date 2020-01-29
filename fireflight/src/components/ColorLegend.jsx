import React from 'react'

const ColorLegend = () => {

  const legendStyle = {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    bottom: '50px',
    right: '30px',
    zIndex: '10', 
  }

  const spanStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    width: '25px',
    borderRight: '1px solid #fff',
    padding: '0 15px',
  }

  return (
    <div className="color-legend" style={legendStyle}>
      <div id="cl-1" className="legend-item" style={{backgroundColor: "black", color: "white"}}>
        <span style={spanStyle}>N/A</span>
      </div>
      <div id="cl-2" className="legend-item" style={{backgroundColor: "green"}}>
        <span style={spanStyle}>0</span>
      </div>
      <div id="cl-3" className="legend-item" style={{backgroundColor: "#88DB57"}}>
        <span style={spanStyle}>25</span>
      </div>
      <div id="cl-4" className="legend-item" style={{backgroundColor: "#FFF072"}}>
        <span style={spanStyle}>50</span>
      </div>
      <div id="cl-5" className="legend-item" style={{backgroundColor: "yellow"}}>
        <span style={spanStyle}>75</span>
      </div>
      <div id="cl-6" className="legend-item" style={{backgroundColor: "darkorange"}}>
        <span style={spanStyle}>100</span>
      </div>
      <div id="cl-7" className="legend-item" style={{backgroundColor: "red", color: "white"}}>
        <span style={spanStyle}>200</span>
      </div>
      <div id="cl-8" className="legend-item" style={{backgroundColor: "darkred", color: "white"}}>
        <span style={spanStyle}>300</span>
      </div>
      <div id="cl-9" className="legend-item" style={{backgroundColor: "#600", color: "white"}}>
        <span style={{spanStyle}, {borderRight: 'none', padding: '0 5px'}}>500</span>
      </div>
    </div>
  )
}

export default ColorLegend;