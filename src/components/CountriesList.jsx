import React from 'react'
import { Link } from 'react-router-dom'

const CountriesList = ({ countries }) => (
  <div className="CountriesList list-group">
    {countries.map((country) => (
      <Link
        key={country.alpha3Code}
        className="list-group-item list-group-item-action"
        to={`/${country.alpha3Code}`}
      >
        <img height={10} alt={country.name} src={country.flag} className="mr-4" />
        {country.name}
      </Link>
    ))}
  </div>
);

export default CountriesList
