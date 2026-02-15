import React, { useState } from "react";
import "./PropertyFilters.css";

const PropertyFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    configuration: [],
    minPrice: "",
    maxPrice: "",
  });

  const configurations = ["1BHK", "2BHK", "3BHK", "4BHK"];

  const handleConfigChange = (config) => {
    const newConfig = filters.configuration.includes(config)
      ? filters.configuration.filter((c) => c !== config)
      : [...filters.configuration, config];

    const newFilters = { ...filters, configuration: newConfig };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value ? parseInt(value) : "" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      configuration: [],
      minPrice: "",
      maxPrice: "",
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-container">
      <div className="filters-section">
        <h3>Configuration</h3>
        <div className="filter-options">
          {configurations.map((config) => (
            <label key={config} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.configuration.includes(config)}
                onChange={() => handleConfigChange(config)}
              />
              <span>{config}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <h3>Budget Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price (₹)"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="price-input"
          />
          <span className="price-separator">to</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price (₹)"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="price-input"
          />
        </div>
      </div>

      <button onClick={clearFilters} className="clear-filters-btn">
        Clear Filters
      </button>
    </div>
  );
};

export default PropertyFilters;
