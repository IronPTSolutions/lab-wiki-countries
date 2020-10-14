const axios = require('axios')

const http = axios.create({
  baseURL: 'https://countries.tech-savvy.tech'
});

export const getCountries = () => {
  return http.get('/countries')
    .then(response => response.data)
}