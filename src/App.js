import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [WeatherData, setWeatherData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const performAPICall = async (text) => {
    setIsLoading(true);
    try {
      let response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=3282328a03ac48ae92022337232809&q=${text}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText !== "") {
      performAPICall(searchText);
    }
  };

  return (
    <div>
      <div className="heading">
        <h1>Weather App</h1>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Enter location"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <>
        {isLoading ? (
          <p>Loading data…</p>
        ) : WeatherData ? (
          <div className="weather-cards">
            <div className="weather-card">
              <h2>Temperature </h2>
              <p>{WeatherData.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h2>Humidity</h2>
              <p>{WeatherData.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h2>Condition</h2>
              <p>{WeatherData.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h2>Wind Speed</h2>
              <p>{WeatherData.current.wind_kph} kph</p>
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
}
