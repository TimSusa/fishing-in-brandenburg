import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import React from 'react'

export const GoogleMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const lat = parseFloat(props.currentGeoPosition.split(',')[0]) || -34.397
  const lng = parseFloat(props.currentGeoPosition.split(',')[1]) || 150.644
  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat, lng }}>
      {props.isMarkerShown && <Marker position={{ lat, lng }} />}
    </GoogleMap>
  )
})
