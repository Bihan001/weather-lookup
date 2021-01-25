import React, { useEffect, useState } from 'react';
import fetchWeather from '../api/fetchWeather';
import ReactMapGL, { Marker, LinearInterpolator } from 'react-map-gl';

const mapAPIKey = 'pk.eyJ1IjoiYmloYW5jIiwiYSI6ImNrazlmamhsMzAydDMyd254aWZ2dTYwaWIifQ.LqqynIf2WmW-2BFGZrnMnw';

const Map = (props) => {
  const { viewport, marker, setViewport, setMarker, setCurrentWeather, theme } = props;

  const [transitionDuration, setTransitionDuration] = useState(200);

  const handleMarkerPosition = (e) => {
    setMarker({ lat: e.lngLat[1], lan: e.lngLat[0] });
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchWeather('COORDS', { lat: marker.lat, lan: marker.lan }).then((res) => setCurrentWeather(res));
    }, 500);
    return () => clearTimeout(timer);
  }, [marker.lat, marker.lan]);

  return (
    <ReactMapGL
      getCursor={(e) => {
        if (e.isDragging) setTransitionDuration(0);
        else setTransitionDuration(200);
      }}
      {...viewport}
      transitionDuration={transitionDuration}
      transitionInterpolator={new LinearInterpolator()}
      mapStyle={`mapbox://styles/mapbox/${theme}`}
      mapboxApiAccessToken={mapAPIKey}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onClick={(e) => {
        handleMarkerPosition(e);
        setViewport((v) => {
          return { ...v, latitude: e.lngLat[1], longitude: e.lngLat[0] };
        });
      }}>
      <Marker
        draggable
        onDragEnd={(e) => handleMarkerPosition(e)}
        latitude={marker.lat}
        longitude={marker.lan}
        offsetLeft={-25}
        offsetTop={-50}>
        <div>
          <img
            src={require('../Assets/pin.svg').default}
            style={{ width: 50, height: 50, transformOrigin: 'center' }}
            alt='marker'
            draggable={false}
          />
        </div>
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
