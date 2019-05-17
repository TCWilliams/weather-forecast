import React from 'react'
import { connect } from 'react-redux'

import { icons } from '../helpers'
import '../styles/app.css'

class DailyForecast extends React.Component {

  buildForecastDisplay() {
    return this.props.weather.daily.data.map(e => {
      return (
        <div className="day-forecast col-sm-6" 
            key={e.time.toString()}>
          <div className="row grid-row">
            <div className="mx-auto">{new Date(e.time * 1000).toLocaleDateString()}</div>
          </div>
          <div className="row grid-row"
                style={{padding: '1em'}}>
            <div className={`mx-auto wi ${icons[e.icon]} icon-large`}></div>
          </div>
          <div className="row grid-row"
               style={{height: '5em'}}>
            <div className="col-sm">Situation</div>
            <div className="col-sm">{e.summary}</div>
          </div>
          <div className="row grid-row">
            <div className="col-sm">High</div>
            <div className="col-sm">{e.temperatureHigh}&#8451;</div>
          </div>
          <div className="row grid-row">
            <div className="col-sm">Low</div>
            <div className="col-sm">{e.temperatureLow}&#8451;</div>
          </div>
          <div className="row grid-row">
            <div className="col-sm">Wind speed</div>
            <div className="col-sm">{e.windSpeed} m/s</div>
          </div>
          <div className="row grid-row">
            <div className="col-sm">Wind bearing</div>
            <div className="col-sm">{e.windBearing}&#176;</div>
          </div>
          <div className="row grid-row">
            <div className="col-sm">Pressure</div>
            <div className="col-sm">{e.pressure} hPa</div>
          </div>
          <div className="row grid-row">
            <div className="col-sm">Chance of rain</div>
            <div className="col-sm">{Math.ceil(e.precipProbability * 100)}%</div>
          </div>
        </div>
        
      )
    })
  }

  render() {
    if (!this.props.weather) {
      return <div></div>
    }
    return (
      <div className="container">
        <div className="mx-auto col-sm-6 text-center">
          <h4>{this.props.weather.daily.summary}</h4>
          <br />
          <h5>8 Day Forecast</h5>
        </div>
        <div className="week-forecast">
          {this.buildForecastDisplay()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  }
}

export default connect(
  mapStateToProps
)(DailyForecast)