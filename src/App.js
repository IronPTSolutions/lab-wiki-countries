import React from 'react';
import Navbar from './components/Navbar';
import CountryDetails from './components/CountryDetails';
import CountriesList from './components/CountriesList';
import { Route } from 'react-router-dom';
import { getCountries } from './services/api-client'

class App extends React.Component {
  state = {
    countries: []
  }

  componentDidMount() {
    getCountries()
      .then(countries => {
        this.setState({
          countries
        })
      })
  }

  render() {
    const countries = this.state.countries

    return (
      <div className="App">
        <Navbar />

        <div className="container">
          <div className="row">
            <div
              className="col-5"
              style={{ maxHeight: '90vh', overflow: 'scroll' }}
            >
              {countries.length
                ? <CountriesList countries={countries} /> 
                : <p data-testid="loader">'Loading...'</p>
              }
            
            </div>

            <div className="col-7">
              {this.state.countries.length > 0 && (
                <Route exact path="/:alpha3Code" component={(props) => <CountryDetails {...props} countries={this.state.countries} />} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
