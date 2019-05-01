import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { setWeather } from '../actions'
import { setForecast } from '../actions'
import './app.css'

const icons = {
  'clear-day': 'wi-day-sunny',
  'clear-night': 'wi-night-clear',
  'partly-cloudy-day': 'wi-day-cloudy',
  'partly-cloudy-night': 'wi-night-cloudy',
  'rain': 'wi-rain',
  'snow': 'wi-snow',
  'sleet': 'wi-sleet',
  'wind': 'wi-windy',
  'fog': 'wi-fog',
  'cloudy': 'wi-cloudy',
  }

class CurrentWeather extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getWeatherData()
    }
  }

  async getWeatherData() {
    const response = await axios.post('http://localhost:9000/weather', {
      latitude: JSON.stringify(this.props.location.coords.lat),
      longitude: JSON.stringify(this.props.location.coords.lng)
    })
    this.props.setWeather(response.data.currently)
    this.props.setForecast(response.data.daily)
  }

  render() {
    if (!this.props.forecast) {
      return <div>No Weather Data</div>
    }
    else {
      return (
        <div>
          <div className="container">
          <div className="col-4 mx-auto">
            <div className="row grid-row">
              <div className={`mx-auto wi ${icons[this.props.weather.icon]} icon-large`}></div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Situation</div>
              <div className="col-sm">{this.props.weather.summary}</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Temperature</div>
              <div className="col-sm float-right">{this.props.weather.temperature}&#8451;</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Wind speed</div>
              <div className="col-sm align-items-end">{this.props.weather.windSpeed} m/s</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Wind bearing</div> 
              <div className="col-sm">{this.props.weather.windBearing}&#176;</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Pressure</div> 
              <div className="col-sm">{this.props.weather.pressure}hPa</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Rainfall</div>
              <div className="col-sm">{this.props.weather.precipIntensity}mm/h</div>
            </div>
            <div className="row grid-row">
              <div className="col-sm">Chance of rain</div>
              <div className="col-sm">{this.props.weather.precipProbability * 100}%</div>
            </div>
          </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    forecast: state.forecast,
    location: state.location
  }
}

export default connect(
  mapStateToProps,
  { setWeather,
    setForecast
   }
)(CurrentWeather)