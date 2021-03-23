const axios = require('axios')

const http = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/all'
});

export const getCountries = () => {
  return http.get('/')
    .then(response => response.data)
}