import React from 'react'
import { connect } from 'react-redux'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import { setLocation } from '../actions'
import config from '../config'


const apiKey = process.env.GOOGLE_API_KEY || config.GOOGLE_API_KEY

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '25em', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />, 
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  if (!props.location) return <div></div>
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: props.location.coords.lat, lng: props.location.coords.lng }}
      options={{streetViewControl: false, fullScreen: false}}
    >
      <Marker
        draggable
        position={{ lat: props.location.coords.lat, lng: props.location.coords.lng }}
        onDragEnd={props.onMarkerDragEnd}
      />
    </GoogleMap>
  )
})

class Map extends React.PureComponent {
  handleMarkerDragEnd = (e) => {
    this.props.setLocation({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    })
  }

  render() {
    if (!this.props.location) return <div></div>
    return (
      <div className="container">
        <div className="col-12 mx-auto">
          <MapComponent
            location={this.props.location}
            onMarkerDragEnd={this.handleMarkerDragEnd}
          />
        </div>
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
)(Map)
