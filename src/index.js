// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CityWeather from './components/CityWeather';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/city/:cityName" element={<CityWeather />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
