import React from 'react'

import { connect } from 'react-redux'

import { icons } from '../helpers'
import './app.css'

class DailyForecast extends React.Component {

  buildForecastDisplay() {
    return this.props.forecast.data.map(e => {
      return (
        <div className="col-3">
          <div className="container">
            <div className="">
              <div className="row grid-row">
                <div className={`mx-auto wi ${icons[e.icon]} icon-large`}></div>
              </div>
              <div className="row grid-row">
                <div className="mx-auto">{new Date(e.time * 1000).toLocaleDateString()}</div>
              </div>
              <div className="row grid-row">
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
                <div className="col-sm">{e.precipProbability * 100}%</div>
              </div>
            </div>
            <br />
          </div>
        </div>
      )
    })
  }

  render() {
    if (!this.props.forecast) return <div></div>
    console.log(this.props.forecast)
    console.log(this.buildForecastDisplay())
    return (

      <div className="container">
        <div className="mx-auto col-6 text-center">
          <h4>{this.props.forecast.summary}</h4>
        </div>
        <br />
        <div className="row overflow-auto">
          {this.buildForecastDisplay()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    forecast: state.forecast,
  }
}

export default connect(
  mapStateToProps
)(DailyForecast)