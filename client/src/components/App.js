import React from 'react'
import axios from 'axios'

import CurrentWeather from './CurrentWeather'
import DailyForecast from './DailyForecast'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weekSummary: '',
      weekIcon: '',
      currentConditions: {},
      weekForecast: [],
    }
    this.currentContent = null
    this.weekContent = null

    this.changeLocation = this.changeLocation.bind(this)
  }

  componentDidMount() {
    this.getLocation()
  }

  componentDidUpdate() {
    this.currentContent = this.updateCurrentContent() // TODO not working
    this.weekContent = this.updateWeekContent()
  }

  getLocation(loc) {
    if (!loc) {
      if(window.navigator.geolocation)  {
        window.navigator.geolocation.getCurrentPosition(
          (location) => this.getWeatherData({
              latitude: location.coords.latitude,
              longitude: location.coords.latitude
            }),
          (err) => console.log(err),
        )
      }
    } else {
      const location = {
        latitude: loc.geometry.location.lat,
        longitude: loc.geometry.location.lng
      }
      this.getWeatherData(location)
    }
  }

  getWeatherData(location) {
    axios.post('http://localhost:9000/weather', {
      latitude: JSON.stringify(location.latitude,),
      longitude: JSON.stringify(location.longitude)
    })
    .then(result => this.updateState(result.data))
    .catch(error => console.log('error', error))
  }

  updateState({currently, daily}) {
    this.setState({
      currentConditions: {
        temperature: currently.temperature,
        apparentTemp: currently.apparentTemperature,
        summary: currently.summary,
        windSpeed: currently.windSpeed,
        gust: currently.windGust,
        windBearing: currently.windBearing,
      },
      weekSummary: daily.summary,
      weekIcon: daily.icon, 
      weekForecast: daily.data.map(e => { 
        return({
          key: e.time.toString(),
          day: e.time,
          high: e.temperatureHigh,
          low: e.temperatureLow,
          sunrise: e.sunriseTime,
          sunset: e.sunsetTime,
        })
      })
    })
  }
  
  updateCurrentContent() {
    return (
      <CurrentWeather
        currentTemp={this.state.currentConditions.temperature}
        apparentTemp={this.state.currentConditions.apparentTemp}
        summary={this.state.currentConditions.summary}
        windSpeed={this.state.currentConditions.windSpeed}
        gust={this.state.currentConditions.gust}
        windBearing={this.state.currentConditions.windBearing} />
    )
  }

  updateWeekContent() {
    return this.state.weekForecast.map(e => {
      return (
        <DailyForecast
          key={e.key}
          day={e.day}
          high={e.high}
          low={e.low}
          sunrise={e.sunrise}
          sunset={e.sunset} />
      )
    })
  }
  /* TODO:
  refactor into seperate component
  hardcoded button to wellington 
  make autocomplete field
  */
  changeLocation() {
    axios.post('http://localhost:9000/location', {
      town: 'wellington+NZ'
    })
    .then(({data}) => this.getWeatherData({
      latitude: data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng
    }))
    .catch(error => console.log('error', error))
  }

  
  render() {
    return (
      <div>
          <button onClick={this.changeLocation}>Wellington</button>
        <div>
        <div id="map"></div>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB85kTWqZHLeX_lc9aPMfg539ME280awPk&callback=initMap" async defer></script>
        </div>
        {this.updateCurrentContent()}
        {this.updateWeekContent()}
      </div>
      
    )
  }
}

export default App