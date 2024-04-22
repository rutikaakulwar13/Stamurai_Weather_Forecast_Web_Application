import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTable from "./components/CityTable/CityTable";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherPage from "./components/WeatherPage/WeatherPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <h1>Weather Forecast App</h1>
        <SearchBar />
        <Routes>
          <Route path="/" element={<CityTable />} />
          <Route
            path="/weather/:cityName/:lat/:lon"
            element={<WeatherPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
