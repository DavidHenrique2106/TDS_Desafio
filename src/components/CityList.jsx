import React from 'react';
import CityCard from './CityCard';

const CityList = ({ cities }) => {
  return (
    <div className="city-list">
      {cities.map(city => (
        <CityCard key={city.name} city={city} />
      ))}
    </div>
  );
};

export default CityList;
