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
  }

  componentDidMount() {
    this.getLocation()
  }

  componentDidUpdate() {
    this.currentContent = this.updateCurrentContent() // TODO not working
    this.weekContent = this.updateWeekContent()
  }

  getLocation() {
    if(window.navigator.geolocation)  {
      window.navigator.geolocation.getCurrentPosition(
        (location) => this.callApi(location),
        (err) => console.log(err),
      )
    }
  }

  callApi(location) {
    axios.post('http://localhost:9000/weather', {
      latitude: JSON.stringify(location.coords.latitude,),
      longitude: JSON.stringify(location.coords.longitude)
    })
    .then(result => this.updateState(result.data))
    .catch(error => console.log('error', error))
  }

  updateState({currently, daily}) {
    console.log(currently, daily)
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
        gust={this.state.gust}
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
  
  render() {
    return (
      <div>
        {this.updateCurrentContent()}
        {this.updateWeekContent()}
      </div>
      
    )
  }
}

export default App