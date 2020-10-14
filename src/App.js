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

        <div class="container">
          <div class="row">
            <div
              class="col-5"
              style={{ maxHeight: '90vh', overflow: 'scroll' }}
            >
              {countries.length ? <CountriesList countries={countries} /> : 'Loading...'}
            
            </div>

            <div class="col-7">
              {this.state.countries.length > 0 && (
                <Route exact path="/:cca3" component={(props) => <CountryDetails {...props} countries={this.state.countries} />} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
