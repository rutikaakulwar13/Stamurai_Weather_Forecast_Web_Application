import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CityTable.css";

const CITY_API_URL = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20`;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "c3c13ee52414aef0d7293ac6c8e0f4ec"; // Replace with your OpenWeatherMap API key

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const navigate = useNavigate();
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(CITY_API_URL, {
          headers: {
            // Removed User-Agent header
          },
        });

        console.log("Cities9:", response);

        if (response.data.results && response.data.results.length > 0) {
          const citiesData = response.data.results.map((record: any) => ({
            name: record.name,
            country: record.cou_name_en,
            timezone: record.timezone,
            lat: record.coordinates.lat,
            lon: record.coordinates.lon,
          }));
          console.log("Cities:", citiesData);
          setCities(citiesData);
          setFilteredCities(citiesData);
          setLoading(false);
        } else {
          setError("No results found");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCityClick = async (
    cityName: string,
    lat: number,
    lon: number
  ) => {
    try {
      const weatherResponse = await axios.get(
        `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (weatherResponse.data) {
        const weatherData = weatherResponse.data;
        const weatherWindow = window.open("", "_blank");
        if (weatherWindow) {
          weatherWindow.document.write(
            `<h1>Weather Details for ${cityName}</h1>
            <p>Temperature: ${weatherData.list[0].main.temp}°C</p>
            <p>Description: ${weatherData.list[0].weather[0].description}</p>
            <p>Humidity: ${weatherData.list[0].main.humidity}%</p>
            <p>Wind Speed: ${weatherData.list[0].wind.speed} m/s</p>
            <p>Atmospheric Pressure: ${weatherData.list[0].main.pressure} hPa</p>`
          );
        }
      } else {
        setError("Weather data not found");
      }
    } catch (err) {
      setError("Error fetching weather data");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by city or country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>Timezone</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city, index) => (
            <tr
              key={index}
              onClick={() => handleCityClick(city.name, city.lat, city.lon)}
            >
              <td>{city.name}</td>
              <td>{city.country}</td>
              <td>{city.timezone}</td>
              <td>{city.lat}</td>
              <td>{city.lon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
