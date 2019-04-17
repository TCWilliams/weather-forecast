import React from 'react'
import axios from 'axios'

import CurrentWeather from './CurrentWeather'
import CurrentWind from './CurrentWind'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTemp: "",
      apparentTemp: "",
      summary: "",
      windSpeed: "",
      gust: "",
      windBearing: ""
    }
  }

  callApi(location) {
    axios.post('http://localhost:9000/weather', {
      latitude: JSON.stringify(location.coords.latitude,),
      longitude: JSON.stringify(location.coords.longitude)
    })
    .then(result => this.updateData(result.data))
    .catch(error => console.log('error', error))
  }

  updateData(data) {
    console.log(data)
    this.setState({ 
      currentTemp: data.currently.temperature,
      apparentTemp: data.currently.apparentTemperature,
      summary: data.currently.summary,
      windSpeed: data.currently.windSpeed,
      gust: data.currently.windGust,
      windBearing: data.currently.windBearing,
    });
  }

  componentDidMount() {
    if(window.navigator.geolocation)  {
      window.navigator.geolocation.getCurrentPosition(
        (location) => this.callApi(location),
        (err) => console.log(err),
      )
    }
  }

  render() {
    return (
      <div>
        <CurrentWeather
          currentTemp={this.state.currentTemp}
          apparentTemp={this.state.apparentTemp}
          summary={this.state.summary} />
        <CurrentWind
          windSpeed={this.state.windSpeed}
          gust={this.state.gust}
          windBearing={this.state.windBearing} />
      </div>
    )
  }
}

export default App