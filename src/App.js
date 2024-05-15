import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import earth from './img/globe.svg'

const App = () => {
  return (
    <div className="app-container">
      <h1 className="white-text">Weather</h1>
      <img src={earth} width={"150px"} alt="Earth" />

      <h2 className="white-text">Select a city</h2>
      <div className="city-container">
        <div className="city-row">
          <Link className="city-link" to="/city/Dallol">Dallol</Link>
          <Link className="city-link" to="/city/Fairbanks">Fairbanks</Link>
          <Link className="city-link" to="/city/Londres">Londres</Link>
        </div>
        <div className="city-row">
          <Link className="city-link" to="/city/Recife">Recife</Link>
          <Link className="city-link" to="/city/Vancouver">Vancouver</Link>
          <Link className="city-link" to="/city/Yakutsk">Yakutsk</Link>
        </div>
      </div>
    </div>
  );
};

export default App;
