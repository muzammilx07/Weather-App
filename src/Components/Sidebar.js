import React, { useState, useMemo } from "react";

const Sidebar = ({ onCitySelect, onClearData }) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [highlightedCities, setHighlightedCities] = useState([]);

  const cities = useMemo(
    () => ["London", "New York", "Las Vegas", "Los Angeles"],
    []
  );

  const handleGetWeatherClick = () => {
    if (highlightedCities.length === cities.length) {
      setHighlightedCities([]);
      setCurrentCityIndex(0);
      onClearData();
    } else {
      const selectedCity = cities[currentCityIndex];
      setHighlightedCities((prev) => [...prev, selectedCity]);
      onCitySelect(selectedCity);

      const nextCityIndex = currentCityIndex + 1;
      setCurrentCityIndex(nextCityIndex);
    }
  };

  return (
    <div className="w-1/4 h-full px-20 border-r-2 border-solid border-black py-12">
      <div className="btn flex justify-center border-b-2 border-black">
        <button
          onClick={handleGetWeatherClick}
          className={`m-4 px-10 py-4 rounded border-2 transition-colors duration-300 ${
            highlightedCities.length === cities.length
              ? "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
              : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-blue-100 hover:border-blue-600"
          }`}
        >
          {highlightedCities.length === cities.length ? "Reset" : "Get Weather"}
        </button>
      </div>
      <div className="cities m-4">
        <div className="citytitle my-1 bg-blue-500 px-10 py-4 rounded text-white border-black border-2">
          City
        </div>
        <div className="cities">
          {cities.map((city) => (
            <div
              key={city}
              className={`citytitle bg-white px-10 py-4 my-0.5 border-2 ${
                highlightedCities.includes(city)
                  ? "border-yellow-500"
                  : "border-black"
              }`}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
