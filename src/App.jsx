

import React, { useEffect, useState } from 'react';
import Days from './components/Days';
import CityDisplay from './components/CityDisplay';
import CitySearch from './components/CitySearch';
import './App.css';

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

// Function to get daily forecasts from the weather data
const getDailyForecasts = (list) => {
  const result = [];
  const map = new Map();

  for (const entry of list) {
    const date = entry.dt_txt.split(' ')[0];
    if (!map.has(date)) {
      map.set(date, entry);
    }
  }

  // We take up to 5 days, starting from the second day for the forecast
  const forecastDays = Array.from(map.values());
  return forecastDays.slice(1, 5);
};

// Main App component 
function App() {
  const [city, setCity] = useState('Kisumu'); // Default city
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found or API error.');
      }

      const data = await response.json();
      setWeather(data);
      const forecastDays = getDailyForecasts(data.list);
      setDays(forecastDays);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  // Fetch weather for the default city when the component mounts
  useEffect(() => {
    fetchWeather('Kisumu');
  }, []);

  return (
    <div className='app-container'>
      <CitySearch city={city} onCityChange={setCity} onSearch={handleSearch} />

      <main className="weather-content">
        <h1>Weather Forecast</h1>

        {error && <p className="error-message">{error}</p>}

        {weather && weather.list && weather.list.length > 0 && (
          <CityDisplay city={weather.city} today={weather.list[0]} />
        )}
        
        {days.length > 0 && <Days days={days} />}
      </main>
    </div>
  );
}

export default App;