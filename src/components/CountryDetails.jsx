import React from 'react'
import { Link } from 'react-router-dom'

const CountryDetails = (props) => {
  const { countries, match: { params: { alpha3Code } } } = props
  const country = countries.find(country => country.alpha3Code === alpha3Code)

  if (!country) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div data-testid="CountryDetails" className="CountryDetails">
      <h1>{country.name}</h1>

      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%'}}>Capital</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{country.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {country.borders.map(border => (
                  <li key={border}>
                    <Link to={`/${border}`}>{border}</Link>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CountryDetails
