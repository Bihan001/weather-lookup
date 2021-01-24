import { Fragment, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './components/Map';
import './css/styles.css';
import Search from './components/Search';
import ThemeSelect from './components/ThemeSelect';

let mapWidth = 1000;
let mapHeight = 600;
if (window.innerWidth <= 768) {
  mapWidth = 500;
  mapHeight = 550;
}

const App = () => {
  const [theme, setTheme] = useState('streets-v11');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [viewport, setViewport] = useState({
    width: mapWidth,
    height: mapHeight,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const [marker, setMarker] = useState({
    lat: 0,
    lan: 0,
  });

  const getCurrentLocation = (cb) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => cb(pos),
      (err) => console.log(err)
    );
  };

  const getMyLocation = () => {
    getCurrentLocation((pos) => {
      setViewport((v) => {
        return { ...v, latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      });
      setMarker({ lat: pos.coords.latitude, lan: pos.coords.longitude });
    });
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <Fragment>
      <div className='container'>
        <div className='header'>
          <h1>Weather Lookup</h1>
        </div>
        <div className='content'>
          <Search
            getMyLocation={getMyLocation}
            setCurrentWeather={setCurrentWeather}
            setMarker={setMarker}
            setViewport={setViewport}
          />
          <div className='card bordered'>
            <div className='title'>Weather Details</div>
            <p>
              {!currentWeather ? (
                <p>Search any city or select a location from the map to get its currrent weather.</p>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <p>
                    Place: {currentWeather.name || 'Not available'}
                    <br />
                    Country: {currentWeather.sys.country || 'Not available'}
                    <br />
                    Feels like: {currentWeather.main.feels_like}°C
                  </p>
                  <p>
                    Temp: {currentWeather.main.temp}°C
                    <br />
                    Min Temp: {currentWeather.main.temp_min}°C
                    <br />
                    Max Temp: {currentWeather.main.temp_max}°C
                  </p>
                  <p>
                    Pressure: {currentWeather.main.pressure}hPa
                    <br />
                    Humidity: {currentWeather.main.humidity}%
                    <br />
                    Visibility: {currentWeather.visibility}m
                  </p>
                </div>
              )}
            </p>
          </div>
          <ThemeSelect setTheme={setTheme} />
        </div>
      </div>
      <div className='map-container'>
        <div className='card bordered'>
          <Map
            theme={theme}
            viewport={viewport}
            marker={marker}
            setViewport={setViewport}
            setMarker={setMarker}
            setCurrentWeather={setCurrentWeather}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
