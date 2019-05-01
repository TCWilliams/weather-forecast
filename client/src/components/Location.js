import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { setLocation } from '../actions'

class Location extends React.Component {

  componentDidMount() {
    this.getLocation()
  }

  /*
  Load users location initially
  */
  getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        location => this.getLocationFromLatLon(location.coords), 
        err => console.log(err),
      )
    }
  }

  getLocationFromLatLon = async ({latitude, longitude}) => {
    const { data } = await axios.post('http://localhost:9000/location/reverse', {
      lat: latitude.toString(),
      lng: longitude.toString()
    })
    
    const location =  {
      name: data.results[3].formatted_address,
      coords: data.results[3].geometry.location
    }
    this.props.setLocation(location)
  }


  render() {
    if (!this.props.location) {
      return <div>'No Location'</div>
    }
    return (
      <div>
        Location {this.props.location.name}
        <br />
        Longitude {this.props.location.coords.lng}
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return {
    location: state.location
  }
}

export default connect(
  mapStateToProps,
  { setLocation }
)(Location)