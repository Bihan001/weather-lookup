import React, { useState } from 'react';
import fetchWeather from '../api/fetchWeather';

const Search = ({ setCurrentWeather, setViewport, setMarker, getMyLocation }) => {
  const [city, setCity] = useState('');
  const handleCitySearch = async (e) => {
    e.preventDefault();
    setCity('');
    let res = await fetchWeather('CITY_NAME', { city_name: city });
    if (res) {
      setCurrentWeather(res);
      setMarker({ lat: res.coord.lat, lan: res.coord.lon });
      setViewport((v) => {
        return { ...v, latitude: res.coord.lat, longitude: res.coord.lon };
      });
    }
  };
  return (
    <form onSubmit={(e) => handleCitySearch(e)}>
      <div id='form-body-search' className='card bordered'>
        <div className='title'>Search</div>
        <div className='input-group'>
          <label className='input text'>
            <input type='text' placeholder='City Name' value={city} onChange={(e) => setCity(e.target.value)} />
            <span>City Name</span>
          </label>
          <button className='unit' type='submit'>
            <i className='material-icons'>search</i>
          </button>
          <button className='unit' onClick={() => getMyLocation()}>
            <i className='material-icons'>my_location</i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
