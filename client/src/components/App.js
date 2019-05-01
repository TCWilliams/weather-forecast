import React from 'react'

import Location from './Location'
import CurrentWeather from './CurrentWeather'
import DailyForecast from './DailyForecast'

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Location />
          <CurrentWeather />
          <DailyForecast />
        </div>
      </div>
    )
  }
}

export default App