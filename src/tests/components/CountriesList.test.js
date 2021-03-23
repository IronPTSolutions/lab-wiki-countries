import React from 'react'
import CountriesList from '../../components/CountriesList'
import { BrowserRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'

afterEach(() => cleanup())

const countries = [
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

function UI({ list }) {
  return (
    <BrowserRouter>
      <CountriesList countries={list || countries} />
    </BrowserRouter>
  )
}

describe('CountriesList', () => {
  test('It renders a list with country links', () => {
    const countryNames = [
      { name: 'España', code: 'ESP' },
      { name: 'Francia', code: 'FRA' }
    ]

    const { container, queryByText } = render(<UI />)

    expect(container.firstChild.nodeName).toBe('DIV')
    expect(container.firstChild.classList.contains('CountriesList')).toBeTruthy()

    countryNames.forEach(country => {
      const countryLink = queryByText(country.name)

      expect(countryLink.nodeName).toBe('A')
      expect(countryLink.parentElement.classList.contains('CountriesList')).toBeTruthy()
      expect(countryLink.getAttribute('href')).toBe(`/${country.code}`)
    })
  })

  test('It wont render any A tag if countries is an empty array', () => {
    const { container } = render(<UI list={[]} />)

    expect(container.querySelectorAll('a.list-group-item').length).toEqual(0)
  })
})