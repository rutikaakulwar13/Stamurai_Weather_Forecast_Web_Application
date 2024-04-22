import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherProps {
  cityName: string;
  lat: number;
  lon: number;
}

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c3c13ee52414aef0d7293ac6c8e0f4ec"; // Replace with your OpenWeatherMap API key

const WeatherPage: React.FC<WeatherProps> = ({ cityName, lat, lon }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`
        );

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data");
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{cityName} Weather</h2>
      <div>Temperature: {weatherData.main.temp}°C</div>
      <div>Weather: {weatherData.weather[0].main}</div>
      <div>Description: {weatherData.weather[0].description}</div>
      <div>Humidity: {weatherData.main.humidity}%</div>
      <div>Wind Speed: {weatherData.wind.speed} m/s</div>
      <div>Pressure: {weatherData.main.pressure} hPa</div>
    </div>
  );
};

export default WeatherPage;
