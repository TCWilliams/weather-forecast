export const setLocation = (location) => {
  return {
    type: 'SET_LOCATION',
    payload: location
  }
}

export const setWeather = (weather) => {
  return {
    type: 'SET_WEATHER',
    payload: weather
  }
}

export const setForecast = (forecast) => {
  return {
    type: 'SET_FORECAST',
    payload: forecast
  }
}

