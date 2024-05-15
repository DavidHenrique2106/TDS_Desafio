import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faCloudMoon, faCloud } from '@fortawesome/free-solid-svg-icons';
import styles from "./CityWheather.module.css";

const API_KEY = '9834561cb4f963a25e323173aef3826a';

const CityWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [cityName]);

  const getCurrentTime = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 3 && hour < 9) return 'Morning';
    if (hour >= 9 && hour < 15) return 'Afternoon';
    if (hour >= 15 && hour < 21) return 'Evening';
    return 'Night';
  };


  console.log(weatherData)




  return (
    <div className={styles['city-weather-container']}>
      {weatherData && (
        <>
          <h1 className={styles['city-name']}>{cityName}</h1>
          <p className={styles['weather-info']}>{weatherData.weather[0].description}</p>
          <p className={styles['weather-info']}>Temperature: {weatherData.main.temp}°C</p>
          <div className={styles['weather-icons-container']}>
            <div className={styles['weather-icon-item']}>
              <p>Dawn</p>
              {getCurrentTime() === 'Morning' && <FontAwesomeIcon icon={faCloudSun} />}
              {getCurrentTime() === 'Afternoon' && <FontAwesomeIcon icon={faCloud} />}
              {getCurrentTime() === 'Evening' && <FontAwesomeIcon icon={faCloud} />}
              {getCurrentTime() === 'Night' && <FontAwesomeIcon icon={faCloudMoon} />}
            </div>
            <div className={styles['weather-icon-item']}>
              <p>Morning</p>
            </div>
            <div className={styles['weather-icon-item']}>
              <p>Afternoon</p>
            </div>
            <div className={styles['weather-icon-item']}>
              <p>Night</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CityWeather;
