
import React from "react";


const Days = ({ days }) => {
  if (!days || days.length === 0) return null;

  const getDayName = (dateString) => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return weekday[date.getDay()];
  };

  return (
    <div className="forecast-container">
      <h3>4-Day Forecast</h3>
      <div className="days-grid">
        {days.map((day, index) => (
          <div key={index} className="forecast-card card">
            <div className="day-name">{getDayName(day.dt_txt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <div className="day-temp">{Math.round(day.main.temp)}°C</div>
            <small className="day-condition">{day.weather[0].description}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Days;