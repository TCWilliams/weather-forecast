import React from 'react'

import Location from './Location'
import CurrentWeather from './CurrentWeather'
import './app.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Location />
          <CurrentWeather />
        </div>
      </div>
    )
  }
}

export default App