import { combineReducers } from 'redux'

const userLocationReducer = (location=null, action) => {
  if (action.type === 'SET_USER_LOCATION') {
    return action.payload
  }
  return location
}

const locationReducer = (location=null, action) => {
  if (action.type === 'SET_LOCATION') {
    return action.payload
  }
  return location
}

const weatherReducer = (weather=null, action) => {
  if (action.type === 'SET_WEATHER') {
    return action.payload
  }
  return weather
}

const forecastReducer = (forecast=null, action) => {
  if (action.type === 'SET_FORECAST') {
    return action.payload
  }
  return forecast
}

export default combineReducers({
  userLocation: userLocationReducer,
  location: locationReducer,
  forecast: forecastReducer,
  weather: weatherReducer
})