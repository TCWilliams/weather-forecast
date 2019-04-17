import React from 'react'

const CurrentWeather = (props) => {
  return (
    <div>
      <h3>Current Conditions</h3>
      <div>Current temperature: {props.currentTemp}c</div>
      <div>Feels like: {props.apparentTemp}c</div>
      <div>{props.summary}</div>
    </div>
  )
}

export default CurrentWeather