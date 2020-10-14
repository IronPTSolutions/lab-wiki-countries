import React from 'react'
import { Link } from 'react-router-dom'

const CountryDetails = (props) => {
  const { countries, match: { params: { cca3 } } } = props
  const country = countries.find(country => country.cca3 === cca3)

  if (!country) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="CountryDetails">
      <h1>{country.name.common}</h1>

      <table class="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%'}}>Capital</td>
            <td>{country.capital[0]}</td>
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
                  <li>
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
