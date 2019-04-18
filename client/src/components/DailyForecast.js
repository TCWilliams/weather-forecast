import React from 'react'

const DailyForecast = (props) => {
  console.log('props', props)
  return (
    <div>
      <h3>{new Date(props.day * 1000).toDateString()}</h3>
      <table>
        <tbody>
          <tr>
            <td><div>High</div></td>
            <td><div>{props.high}</div></td>
          </tr>
          <tr>
            <td><div>Low</div></td>
            <td><div>{props.low}</div></td>
          </tr>
          <tr>
            <td><div>Sunrise</div></td>
            <td><div>{new Date(props.sunrise * 1000).toLocaleTimeString()}</div></td>
          </tr>
          <tr>
            <td><div>Sunset</div></td>
            <td><div>{new Date(props.sunset * 1000).toLocaleTimeString()}</div></td>
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

export default DailyForecast