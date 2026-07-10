import React from "react";
import "./DetailView.css";

export default function DetailView({
  country,
  onBack,
  allCountries,
  onBorderClick,
}) {
  // Helper to safely map 3-letter border acronyms (e.g., "FRA") to full country objects
  const getBorderCountry = (borderCode) => {
    return allCountries.find((c) => c.alpha3Code === borderCode);
  };

  return (
    <main className="detail__container">
      {/* --- BACK BUTTON --- */}
      <button className="back__button" onClick={onBack}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="back__icon"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </button>

      {/* --- SPLIT PROFILE VIEW LAYOUT --- */}
      <div className="detail__layout">
        <div className="detail__flag-wrapper">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`${country.name} flag`}
            className="detail__flag"
          />
        </div>

        {/* Right pane: Core Metrics and Details */}
        <div className="detail__content">
          <h1 className="detail__name">{country.name}</h1>

          <div className="detail__columns">
            <div className="detail__col">
              <p className="detail__item">
                <strong>Native Name:</strong> {country.nativeName || "N/A"}
              </p>
              <p className="detail__item">
                <strong>Population:</strong>{" "}
                {country.population?.toLocaleString()}
              </p>
              <p className="detail__item">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="detail__item">
                <strong>Sub Region:</strong> {country.subregion || "N/A"}
              </p>
              <p className="detail__item">
                <strong>Capital:</strong> {country.capital || "N/A"}
              </p>
            </div>

            <div className="detail__col">
              <p className="detail__item">
                <strong>Top Level Domain:</strong>{" "}
                {country.topLevelDomain?.join(", ") || "N/A"}
              </p>
              <p className="detail__item">
                <strong>Currencies:</strong>{" "}
                {country.currencies?.map((curr) => curr.name).join(", ") ||
                  "N/A"}
              </p>
              <p className="detail__item">
                <strong>Languages:</strong>{" "}
                {country.languages?.map((lang) => lang.name).join(", ") ||
                  "N/A"}
              </p>
            </div>
          </div>

          {/* --- BORDER COUNTRIES SECTION --- */}
          <div className="detail__borders">
            <h3 className="borders__title">Border Countries:</h3>
            <div className="borders__list">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((borderCode) => {
                  const borderCountry = getBorderCountry(borderCode);
                  return (
                    <button
                      key={borderCode}
                      className="border__tag"
                      onClick={() =>
                        borderCountry && onBorderClick(borderCountry)
                      }
                      disabled={!borderCountry}
                    >
                      {borderCountry ? borderCountry.name : borderCode}
                    </button>
                  );
                })
              ) : (
                <span className="no-borders">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
