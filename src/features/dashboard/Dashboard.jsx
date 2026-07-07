import React, { useState } from "react";
import countryData from "../../data/countries.json";
import "./Dashboard.css";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamically filter countries based on search input and dropdown region selection
  const filteredCountries = countryData.filter((country) => {
    const matchesSearch = country.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion
      ? country.region === selectedRegion
      : true;

    return matchesSearch && matchesRegion;
  });

  return (
    <main className="dashboard__container">
      <div className="controls__row">
        {/* --- SEARCH BAR WRAPPER --- */}
        <div className="search__bar--wrapper">
          {/* Your custom SVG Repo Search Icon */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="search__icon"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
              fill="currentColor" /* Adapts theme color changes smoothly */
            />
          </svg>

          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* --- REGION FILTER DROPDOWN --- */}
        <div className="filter__wrapper">
          {/* The visible header acting as the selection button */}
          <button
            type="button"
            className="filter__trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="filter__text">
              {selectedRegion || "Filter by Region"}
            </span>
            {/* Optional: Small chevron arrow that rotates when open */}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={`chevron__icon ${isDropdownOpen ? "open" : ""}`}
            >
              <path
                d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                fill="currentColor" /* Smooth color adaptation between Light & Dark themes */
              />
            </svg>
          </button>

          {/* The actual options list container - only visible when clicked open */}
          {isDropdownOpen && (
            <ul className="filter__options">
              <li
                onClick={() => {
                  setSelectedRegion("Africa");
                  setIsDropdownOpen(false);
                }}
              >
                Africa
              </li>
              <li
                onClick={() => {
                  setSelectedRegion("Americas");
                  setIsDropdownOpen(false);
                }}
              >
                America
              </li>
              <li
                onClick={() => {
                  setSelectedRegion("Asia");
                  setIsDropdownOpen(false);
                }}
              >
                Asia
              </li>
              <li
                onClick={() => {
                  setSelectedRegion("Europe");
                  setIsDropdownOpen(false);
                }}
              >
                Europe
              </li>
              <li
                onClick={() => {
                  setSelectedRegion("Oceania");
                  setIsDropdownOpen(false);
                }}
              >
                Oceania
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* --- COUNTRIES GRID (image_dee6e1.jpg Style) --- */}
      <div className="countries__grid">
        {filteredCountries.map((item, index) => (
          <div key={item.alpha3Code || index} className="country__card">
            <div className="flag__wrapper">
              <img
                src={item.flags?.png}
                alt={`${item.name} flag`}
                className="country__flag"
                loading="lazy"
              />
            </div>
            <div className="country__info">
              <h2 className="country__name">{item.name}</h2>
              <p className="info__item">
                <strong>Population:</strong> {item.population?.toLocaleString()}
              </p>
              <p className="info__item">
                <strong>Region:</strong> {item.region}
              </p>
              <p className="info__item">
                <strong>Capital:</strong> {item.capital || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
