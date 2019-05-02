import React from 'react'
import { connect } from 'react-redux'

import Spinner from './Spinner'
import { setUserLocation } from '../actions'
import { setLocation } from '../actions'

class Location extends React.Component {

  componentDidMount() {
    if (window.navigator.geolocation) {
      this.props.setUserLocation()
    }
  }

  componentDidUpdate() {
    if (!this.props.location) {
      this.props.setLocation(this.props.userLocation)
    }
  }

  render() {
    if (!this.props.location) {
      return (
        <div>
          <Spinner text={'Finding location'} />
        </div>
      )
    }
    return (
      <div className="text-center">
        <h3>{this.props.location.name}</h3>
        <br />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLocation: state.userLocation,
    location: state.location
  }
}

export default connect(
  mapStateToProps,
  {
    setUserLocation,
    setLocation
  }
)(Location)