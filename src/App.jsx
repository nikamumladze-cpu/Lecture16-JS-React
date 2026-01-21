import React, { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "./component/statcard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  useEffect(() => {
    fetchWeather("Tbilisi");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <main className="app-container">
      <section className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City..."
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <section className="weather-display">
          <div className="weather-header">
            <h2 className="city-name">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="weather-icon"
            />
          </div>

          <div className="temp-info-container">
            <h2 className="main-temp">{Math.round(weather.main.temp)}°</h2>
            <h3 className="weather-desc">{weather.weather[0].main}</h3>
          </div>

          <div className="stats-container">
            <StatCard label={"Humidity"} value={`${weather.main.humidity}%`} />
            <StatCard
              label={"Wind Speed"}
              value={`${weather.wind.speed} m/s`}
            />
            <StatCard label={"Pressure"} value={weather.main.pressure} />
            <StatCard
              label={"Visibility"}
              value={`${weather.visibility} Meters`}
            />
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
