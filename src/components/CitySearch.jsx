
import React from "react";


const CitySearch = ({ city, onCityChange, onSearch }) => {
  return (
    <div className="city-search-container">
      <form onSubmit={onSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default CitySearch;