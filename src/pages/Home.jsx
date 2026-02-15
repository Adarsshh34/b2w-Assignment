import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PropertyFilters from "../components/PropertyFilters";
import PropertyCard from "../components/PropertyCard";
import { useProperty } from "../context/PropertyContext";
import "./Home.css";

const Home = () => {
  const { searchProperties } = useProperty();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    configuration: [],
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const results = searchProperties(filters);
    setProperties(results);
  }, []);

  const handleSearch = (searchQuery) => {
    const newFilters = { ...filters, searchQuery };
    setFilters(newFilters);
    const results = searchProperties(newFilters);
    setProperties(results);
  };

  const handleFilterChange = (newFilters) => {
    const combinedFilters = { ...filters, ...newFilters };
    setFilters(combinedFilters);
    const results = searchProperties(combinedFilters);
    setProperties(results);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />

      <div className="home-content">
        <aside className="filters-sidebar">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </aside>

        <main className="properties-main">
          <div className="properties-header">
            <h2>Available Properties</h2>
            <p className="properties-count">
              {properties.length} properties found
            </p>
          </div>

          {properties.length > 0 ? (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="no-properties">
              <h3>No properties found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
