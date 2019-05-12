import React from 'react'

import Map from './Map'
import Location from './Location'
import CurrentWeather from './CurrentWeather'
import DailyForecast from './DailyForecast'

class App extends React.Component {

  
  render() {
    return (
      <div>
        <div>
          <Map />
          <Location />
          <CurrentWeather />
          <DailyForecast />
        </div>
      </div>
    )
  }
}

export default App