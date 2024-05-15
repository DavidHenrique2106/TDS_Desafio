import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row } from "antd";
import styles from "./CityWheather.module.css";

const API_KEY = "9834561cb4f963a25e323173aef3826a";

const CityWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDetail, setWeatherDetail] = useState(null);
  const { cityName } = useParams();
  const timestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const fetchedWeatherData = response.data;
        setWeatherData(fetchedWeatherData);

        if (fetchedWeatherData && fetchedWeatherData.coord) {
          const { lat, lon } = fetchedWeatherData.coord;
          const e = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          setWeatherDetail(e.data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [cityName]);

 
  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const determineColor = (description) => {
    switch (description) {
      case "clear sky":
        return "#47B3C6";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "#4E5665";
      case "shower rain":
      case "rain":
      case "thunderstorm":
        return "#4E5665";
      case "snow":
        return "#C9C9C9";
      default:
        return "#FFFFFF";
    }
  };

  const determineColorFont = (description) => {
    switch (description) {
      case "clear sky":
        return "#FFFFFF";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "#FFFFFF";
      case "shower rain":
      case "rain":
      case "thunderstorm":
        return "#FFFFFF";
      case "snow":
        return "black";
      default:
        return "black";
    }
  };

  const contentStyle = {
    backgroundColor: weatherData
      ? determineColor(weatherData.weather[0].description)
      : "#FFFFFF",
    color: weatherData
      ? determineColorFont(weatherData.weather[0].description)
      : "#FFFFFF",
  };

  const sunriseTime = timestampToTime(weatherData && weatherData.sys.sunrise);
  const sunsetTime = timestampToTime(weatherData && weatherData.sys.sunset);

  return (
    <>
      <div className={styles.content} style={contentStyle}>
        {weatherData && (
          <>
            <header className={styles.header}>
              <Link to="/">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={styles.icon}
                  style={contentStyle}
                />
              </Link>
            </header>
            <div className={styles["city-weather-container"]}>
              <h1 className={styles["city-name"]}>{cityName}</h1>
              <p className={styles["weather-info"]}>
                {weatherData.weather[0].description}
              </p>
              <Row style={{ marginTop: "-90px" }}>
                <p className={styles["weather-info-temp"]}>
                  {weatherData.main.temp}
                </p>
                <div className={styles.tempMinMax}>
                  °C
                  <p style={{ marginBottom: "-9px" }}>
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      style={{
                        ...contentStyle,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    {weatherData.main.temp_max}°
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      style={{
                        ...contentStyle,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    {weatherData.main.temp_min}°
                  </p>
                </div>
              </Row>
              <div
                className={styles["weather-icon-item"]}
                style={{ marginTop: "-90px" }}
              >
                <img
                  src={getIconUrl(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                  width={"150px"}
                />
              </div>
            </div>

            <div className={styles["weather-icons-container"]}>
              <div className={styles["weather-icon-item"]}>
                <p>Dawn</p>
                {weatherDetail && (
                  <>
                    <img
                      src={getIconUrl(weatherDetail.list[1].weather[0].icon)}
                      alt={weatherDetail.list[1].weather[0].description}
                      width={"50px"}
                    />
                    <p className={styles.fontList}>
                      {weatherDetail.list[1].main.temp}°C
                    </p>
                  </>
                )}
              </div>
              <div className={styles["weather-icon-item"]}>
                <p>Morning</p>
                {weatherDetail && (
                  <>
                    <img
                      src={getIconUrl(weatherDetail.list[3].weather[0].icon)}
                      alt={weatherDetail.list[3].weather[0].description}
                      width={"50px"}
                    />
                    <p className={styles.fontList}>
                      {weatherDetail.list[3].main.temp}°C
                    </p>
                  </>
                )}
              </div>
              <div className={styles["weather-icon-item"]}>
                <p>Afternoon</p>
                {weatherDetail && (
                  <>
                    <img
                      src={getIconUrl(weatherDetail.list[5].weather[0].icon)}
                      alt={weatherDetail.list[5].weather[0].description}
                      width={"50px"}
                    />
                    <p className={styles.fontList}>
                      {weatherDetail.list[5].main.temp}°C
                    </p>
                  </>
                )}
              </div>
              <div className={styles["weather-icon-item"]}>
                <p>Night</p>
                {weatherDetail && (
                  <>
                    <img
                      src={getIconUrl(weatherDetail.list[7].weather[0].icon)}
                      alt={weatherDetail.list[7].weather[0].description}
                      width={"50px"}
                    />
                    <p className={styles.fontList}>
                      {weatherDetail.list[7].main.temp}°C
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className={styles.divFooter} style={contentStyle}>
              <div>
                <p>Wind Speed</p>
                {weatherData && weatherData.wind.speed}m/s
              </div>

              <div>
                <p>Sunset</p>
                <p>{sunsetTime}</p>
              </div>

              <div>
                <p>Sunrise</p>
                <p>{sunriseTime}</p>
              </div>

              <div>
                <p>humidity</p>
                {weatherData && weatherData.main.humidity}%
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CityWeather;
