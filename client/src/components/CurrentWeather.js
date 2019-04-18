import React from 'react'

const CurrentWeather = (props) => {
  return (
    <div>
      <h3>Current Conditions</h3>
      <table>
        <tbody>
          <tr>
            <td><div>Current temperature</div></td>
            <td><div>{props.currentTemp}</div></td>
          </tr>
          <tr>
            <td><div>Feels like</div></td>
            <td><div>{props.apparentTemp}</div></td>
          </tr>
          <tr>
            <td><div>Summary</div></td>
            <td><div>{props.summary}</div></td>
          </tr>
          <tr>
            <td><div>Wind speed (m/s)</div></td>
            <td><div>{props.windSpeed}</div></td>
          </tr>
          <tr>
            <td><div>Wind gust (m/s)</div></td>
            <td><div>{props.gust}</div></td>
          </tr>
          <tr>
            <td><div>Wind bearing (degrees)</div></td>
            <td><div>{props.windBearing}</div></td>
          </tr>
        </tbody>  
      </table>
    </div>
  )
}

export default CurrentWeather