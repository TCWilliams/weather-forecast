import React from 'react'
import { connect } from 'react-redux'

import Spinner from './Spinner'

import { setInitialLocation } from '../actions'
import { setLocation } from '../actions'

class Location extends React.Component {

  componentDidMount() {
    if (window.navigator.geolocation) {
      this.props.setInitialLocation()
    }
  }

  componentDidUpdate() {
    if (!this.props.location || (JSON.stringify(this.props.location) !== JSON.stringify(this.props.location))) {
      this.props.setLocation(this.props.initialLocation)
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
    initialLocation: state.initialLocation,
    location: state.location
  }
}

export default connect(
  mapStateToProps,
  {
    setInitialLocation,
    setLocation
  }
)(Location)