import React from 'react'
import { Link } from 'react-router-dom'
import { getCountry } from '../services/api-client'

class CountryDetails extends React.Component {
  state = {
    country: null
  }

  fetchCountry = () => {
    getCountry(this.props.match.params.cca3).then((country) => {
      this.setState({ country });
    });
  }

  componentDidMount() {
    this.fetchCountry()
  }

  componentDidUpdate() {
    if (this.state.country && this.state.country.cca3 !== this.props.match.params.cca3) {
      this.fetchCountry()
    }
  }

  render() {
    const country = this.state.country

    if (country === null) {
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
}

export default CountryDetails
