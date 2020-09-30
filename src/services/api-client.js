const axios = require('axios')

const http = axios.create({
  baseURL: 'http://localhost:8000'
});

export const getCountries = () => {
  return http.get('/countries')
    .then(response => response.data)
}

export const getCountry = (cca3) => {
  return http.get(`/countries/${cca3}`)
    .then(response => response.data)
}