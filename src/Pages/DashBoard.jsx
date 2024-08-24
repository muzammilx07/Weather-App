import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Table from "../Components/Table";

const API_URL = "https://python3-dot-parul-arena-2.appspot.com/test?cityname=";

const DashBoard = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}${cityName}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const dataTimestamp = new Date(data.date_and_time);
      const currentTime = new Date();
      const ageInMilliseconds = currentTime - dataTimestamp;
      const ageInHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));

      const newEntry = {
        city: cityName,
        description: data.description || "N/A",
        temperature: `${data.temp_in_celsius}°C` || "N/A",
        pressure: `${data.pressure_in_hPa} hPa` || "N/A",
        age: ageInHours, // Age in hours
        id: new Date().getTime(),
      };

      setWeatherData((prevData) => {
        const existingData = prevData.find((item) => item.city === cityName);
        if (existingData) {
          return prevData.map((item) =>
            item.city === cityName ? { ...item, ...newEntry } : item
          );
        } else {
          return [...prevData, newEntry];
        }
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleCitySelect = (cityName) => {
    fetchWeatherData(cityName);
  };

  const handleClearData = () => {
    setWeatherData([]);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="nav w-full py-6 bg-blue-500 flex justify-center items-center">
        <h1 className="text-3xl text-white">Weather App</h1>
      </div>
      <div className="flex flex-grow py-1">
        <Sidebar
          onCitySelect={handleCitySelect}
          onClearData={handleClearData}
        />
        <Table weatherData={weatherData} />
      </div>
    </div>
  );
};

export default DashBoard;
