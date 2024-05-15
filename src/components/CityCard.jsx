import React from 'react';
import { Link } from 'react-router-dom';

const CityCard = ({ city }) => {
  return (
    <Link to={`/${city.name}`} className="city-card">
      <img src={city.image} alt={city.name} />
      <h2>{city.name}</h2>
    </Link>
  );
};

export default CityCard;
