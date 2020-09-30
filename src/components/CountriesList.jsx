import React from 'react'
import { Link } from 'react-router-dom'

const CountriesList = ({ countries }) => (
  <div class="list-group">
    {countries.map((country) => (
      <Link
        class="list-group-item list-group-item-action"
        to={`/${country.cca3}`}
      >
        <span className="mr-4">{country.flag}</span>
        {country.name.common}
      </Link>
    ))}
  </div>
);

export default CountriesList
