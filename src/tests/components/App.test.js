import React from 'react'
import App from '../../App'
import { render, cleanup, waitForDomChange, fireEvent } from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import * as ApiClient from '../../services/api-client'

ApiClient.getCountries = jest.fn().mockImplementation(() => {
  return Promise.resolve(
    [
      {
        alpha3Code: 'ESP',
        flag: "test.png",
        name: 'España',
        capital: 'Madrid',
        area: 1000,
        borders: ["AND", "FRA", "GIB", "PRT", "MAR"]
      },
      {
        alpha3Code: 'FRA',
        flag: "test.png",
        name: 'Francia',
        capital: 'Paris',
        area: 1000,
        borders: ["AND", "ESP", "GIB", "PRT", "MAR"]
      }
    ]
  )
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

function UI() {
  return (
    <BrowserRouter>
      <App />
      <LocationDisplay />
    </BrowserRouter>
  )
}

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

describe('App', () => {
  test('It renders a Navbar and a loading state by default', () => {
    const { queryByTestId } = render(<UI />)

    expect(queryByTestId('navbar')).not.toBeNull()
    expect(queryByTestId('loader')).not.toBeNull()
  })

  test('It renders a CountriesList', async () => {
    const { queryByTestId, debug } = render(<UI />)

    expect(queryByTestId('loader')).not.toBeNull()

    await waitForDomChange()

    expect(ApiClient.getCountries).toHaveBeenCalledTimes(1)

    expect(queryByTestId('CountriesList')).not.toBeNull()
  })

  test('It navigates to alpha3code of the country and renders its info', async () => {
    const { queryByTestId, queryByText, debug } = render(<UI />)

    expect(queryByTestId('loader')).not.toBeNull()

    expect(queryByTestId('location-display').textContent).toBe('/')

    await waitForDomChange()

    expect(ApiClient.getCountries).toHaveBeenCalledTimes(1)

    fireEvent.click(queryByText('España'))

    expect(queryByTestId('location-display').textContent).toBe('/ESP')
    expect(queryByTestId('CountryDetails')).not.toBeNull()
  })
})