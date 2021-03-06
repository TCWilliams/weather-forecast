import React from 'react'
import { connect } from 'react-redux'

import Spinner from './Spinner'
import { icons } from '../helpers'

import { setWeather } from '../actions'
import '../styles/app.css'

class CurrentWeather extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.setWeather(this.props.location)
    }
  }

  buildWeatherData() {
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 mx-auto">
            <div className="row grid-row"
                 style={{padding: '1em'}}>
              <div className={`mx-auto wi ${icons[this.props.weather.currently.icon]} icon-large`}></div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Situation</div>
              <div className="col-sm">{this.props.weather.currently.summary}</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Temperature</div>
              <div className="col-sm float-right">{this.props.weather.currently.temperature}&#8451;</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Wind speed</div>
              <div className="col-sm align-items-end">{this.props.weather.currently.windSpeed} m/s</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Wind bearing</div>
              <div className="col-sm">{this.props.weather.currently.windBearing}&#176;</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Pressure</div>
              <div className="col-sm">{this.props.weather.currently.pressure} hPa</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Rainfall</div>
              <div className="col-sm">{this.props.weather.currently.precipIntensity} mm/h</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Chance of rain</div>
              <div className="col-sm">{Math.ceil(this.props.weather.currently.precipProbability * 100)}%</div>
            </div>
          </div>
        </div>
        <br />
      </div>
    )
  }

  render() {
    if (!this.props.location && !this.props.weather) {
      return <div></div>
    }
    if (this.props.location && !this.props.weather) {
      return (
        <div className="container">
          <div className="col-sm mx-auto">
            <Spinner text={'Getting weather data'} />
          </div>
        </div>
      )
    }
    else {
      return this.buildWeatherData()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    location: state.location
  }
}

export default connect(
  mapStateToProps,
  {
    setWeather,
  }
)(CurrentWeather)