import axios from 'axios'

export const setUserLocation = () =>
  dispatch => {
    window.navigator.geolocation.getCurrentPosition(
      location => {
        dispatch({
          type: 'SET_USER_LOCATION',
          payload: location.coords
        })
      },
      err => console.log(err),
    )
  }

export const setLocation = location => async dispatch => {
  const { data } = await axios.post('api/location', {
    lat: location.latitude.toString(),
    lng: location.longitude.toString()
  })
  data.status !== 'ZERO_RESULTS' && dispatch({
    type: 'SET_LOCATION', payload: {
      name: data.results[0].formatted_address,
      coords: data.results[0].geometry.location
    }
  })
}

export const setWeather = location => async dispatch => {
  const { data } = await axios.post('api/weather', {
    latitude: JSON.stringify(location.coords.lat),
    longitude: JSON.stringify(location.coords.lng)
  }) 
  dispatch({
    type: 'SET_WEATHER',
    payload: data
  })
}

export const setForecast = (forecast) => {
  return {
    type: 'SET_FORECAST',
    payload: forecast
  }
}

