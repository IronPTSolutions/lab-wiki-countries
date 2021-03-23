import React from 'react'
import Navbar from '../../components/Navbar'
import { cleanup, render } from '@testing-library/react'

afterEach(() => cleanup())

describe('Navbar', () => {
  test('It renders a NAV tag', () => {
    const { container, debug } = render(<Navbar />)

    expect(container.firstChild.nodeName).toBe('NAV')
    expect(container.firstChild.classList.contains('navbar')).toBeTruthy()
    expect(container.firstChild.classList.contains('navbar-dark')).toBeTruthy()
  })

  test('It renders an A tag with attribute href pointing to "/"', () => {
    const { queryByText } = render(<Navbar />)

    const element = queryByText('WikiCountries')

    expect(element).not.toBeNull()
    expect(element.nodeName).toBe('A')
    expect(element.parentElement.parentElement.nodeName).toBe('NAV')
    expect(element.getAttribute('href')).toBe('/')
  })
})