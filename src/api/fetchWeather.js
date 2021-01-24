import axios from 'axios';

const weatherAPIKey = 'e4e40b8ea4e6a131dddcdadd76d89036';

const fetchWeather = async (type, data) => {
  try {
    switch (type) {
      case 'COORDS': {
        const { lat, lan } = data;
        let res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&appid=${weatherAPIKey}&units=metric`
        );
        return res.data;
      }
      case 'CITY_NAME': {
        const { city_name } = data;
        let res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${weatherAPIKey}&units=metric`
        );
        return res.data;
      }
      default:
        throw { message: 'This is an error' };
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchWeather;
