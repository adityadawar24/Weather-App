import React, { useState } from "react";
import './weather.css';


const Weather = () => {
    const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  

  const apiKey = "b4cd564be459b46b735044b9dd0b06de";

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        fetchForecast();
        fetchHourlyForecast();
      })
      .catch((error) => {
        alert("No weather found.");
        console.error(error);
      });
  };

  const fetchForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No forecast found.");
        }
        return response.json();
      })
      .then((data) => {
        setForecastData(data.list.filter((item, index) => index % 8 === 0));
      })
      .catch((error) => {
        alert("No forecast found.");
        console.error(error);
      });
  };

  const fetchHourlyForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No hourly forecast found.");
        }
        return response.json();
      })
      .then((data) => {
        setHourlyForecastData(data.list);
      })
      .catch((error) => {
        alert("No hourly forecast found.");
        console.error(error);
      });
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter the place"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.2 31.3 155.4 87.9 212.1 28.4 28.4 60.4 50.4 95.2 65.5L302 907.7c-3.7 16.4 1.5 33.6 13.4 45.6 11.9 11.9 28.9 17 45.4 13.3l234.1-52.3c15.2 9.6 32.7 15.1 51.4 15.1 47 0 85.1-38.1 85.1-85.1 0-18.6-5.5-36.1-15.1-51.4l52.3-234.1c3.6-16.5-1.5-33.6-13.4-45.5-11.9-11.9-28.9-17-45.4-13.3L307.2 715.8c-15.2-9.6-32.7-15.1-51.4-15.1-47-0.1-85.1 38-85.1 85 0 18.6 5.5 36.1 15.1 51.4l260.7 259.7c10.1 10.1 23.3 14.7 36.5 14.7 10.3 0 20.7-3.1 29.6-9.4l0.4-0.2 234.1-52.3C912.6 888 920.6 872.1 909.6 854.5zM412 636c-27.6 0-53.3-10.7-72.8-30.2S309 547.6 309 520s10.7-53.3 30.2-72.8c19.5-19.5 45.2-30.2 72.8-30.2s53.3 10.7 72.8 30.2S482 486.4 482 514s-10.7 53.3-30.2 72.8C465.3 625.3 439.6 636 412 636z"
            />
          </svg>
        </button>
      </div>

      {weatherData && (
        <div className="weather">
          <h2 className="city">Weather in {weatherData.name}</h2>
          <h1 className="temp">{weatherData.main.temp}°C</h1>
          <div className="flex">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt=""
              className="icon"
            />
            <div className="description">
              {weatherData.weather[0].description}
            </div>
          </div>
          <div className="humidity">
            Humidity: {weatherData.main.humidity}%
          </div>
          <div className="wind">
            Wind speed: {weatherData.wind.speed} km/h
          </div>

          <div className="forecast-cards">
            <h3 className="forecast-title">Daily Forecast</h3>
            {forecastData.map((item) => (
              <div className="forecast-card" key={item.dt}>
                <div className="day">
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt=""
                  className="forecast-icon"
                />
                <div className="forecast-temp">{item.main.temp}°C</div>
              </div>
            ))}
          </div>

          <div className="forecast-cards">
            <h3 className="forecast-title">Hourly Forecast</h3>
            {hourlyForecastData.map((item) => (
              <div className="forecast-card" key={item.dt}>
                <div className="hour">
                  {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "numeric",
                  })}
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt=""
                  className="forecast-icon"
                />
                <div className="forecast-temp">{item.main.temp}°C</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
  
 

export default Weather
