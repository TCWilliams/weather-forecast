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
    console.log(window.esri.geometry.xyToLngLat(1898786, 5657292))
    console.log(window.esri.geometry.lngLatToXY(-39.182382, 176.459465))
    
    // console.log('esri.geometry.lngLatToXY(-120, 33);', esri.geometry.lngLatToXY(-120, 33))
    // require([

    //   'esri/geometry/webMercatorUtils'

    // ], function (webMercatorUtils) {
    //   var normalizedVal = webMercatorUtils.xyToLngLat(42215329, 1321748);
    //   console.log(normalizedVal); //returns 19.226, 11.789

    //   var value = webMercatorUtils.xyToLngLat(42215329, 1321748, true);
    //   console.log(value); // returns 379.22, 11.78


    // })
  }
  render() {
    if (!this.props.location && !this.props.weather) {
      return <div></div>
    }
    if (this.props.location && !this.props.weather) {
      return (
        <div>
          <Spinner text={'Getting weather data'} />
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="container">
            <div className="col-4 mx-auto">
              <div className="row grid-row">
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
                <div className="col-sm">{this.props.weather.currently.precipProbability * 100}%</div>
              </div>
            </div>
          </div>
          <br />
        </div>
      )
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