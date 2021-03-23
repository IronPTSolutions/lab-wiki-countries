import React from 'react'
import CountryDetails from '../../components/CountryDetails'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

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
  },
]

function UI({ list }) {
  return (
    <BrowserRouter>
      <CountryDetails countries={list || countries} match={{ params: { alpha3Code: 'ESP' } }} />
    </BrowserRouter>
  )
}

describe('CountryDetails', () => {
  test('It renders the information of the country with the current alpha3Code', () => {
    const { queryByText, container } = render(<UI />)

    expect(queryByText('Loading...')).toBeNull()

    expect(container.firstChild.classList.contains('CountryDetails')).toBeTruthy()
    expect(queryByText('España').nodeName).toBe('H1')

    expect(container.querySelector('table')).not.toBeNull()
    expect(container.querySelector('table').classList.contains('table')).toBeTruthy()
  })

  test('It renders correctly the info on the table', () => {
    const { queryByText } = render(<UI />)

    expect(queryByText('Capital').nodeName).toBe('TD')
    expect(queryByText('Capital').nextSibling.textContent).toBe('Madrid')
  })

  test('It renders the borders of the country as A tags', () => {
    const borders = ["AND", "FRA", "GIB", "PRT", "MAR"]

    const { queryByText } = render(<UI />)

    borders.forEach(border => {
      const borderNode = queryByText(border)

      expect(borderNode.nodeName).toBe('A')
      expect(borderNode.parentElement.nodeName).toBe('LI')
      expect(borderNode.getAttribute('href')).toBe(`/${border}`)
    })
  })

  test('It renders a loading text if there are no countries', () => {
    const { queryByText } = render(<UI list={[]} />)

    expect(queryByText('Loading...')).not.toBeNull()
  })
})

