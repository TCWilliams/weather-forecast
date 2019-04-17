import React from 'react'

const CurrentWind = (props) => {
  return(
    <div>
      <h3>Current wind conditions</h3>
      <div>Sustained: {props.windSpeed}</div>
      <div>Gust: {props.gust}</div>
      <div>Direction: {props.windBearing}</div>
    </div>
  )
}

export default CurrentWind