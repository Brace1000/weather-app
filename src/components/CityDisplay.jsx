
import React from "react";

const CityDisplay = ({ city, today }) => {
  if (!city || !today) return null;

  const { name, country } = city;
  const { weather, main, wind } = today;

  return (
    <div className="city-display-card card">
      <div className="location">
        <h2>{name}, {country}</h2>
        <p>Current Weather</p>
      </div>
      <div className="main-weather">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt={weather[0].description}
        />
        <div className="temp">{Math.round(main.temp)}°C</div>
        <div className="condition">{weather[0].description}</div>
      </div>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Feels Like</span>
          <span className="value">{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind</span>
          <span className="value">{(wind.speed * 3.6).toFixed(1)} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CityDisplay;