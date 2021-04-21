import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Categ from '../components/Categ'
import CategDetails from '../components/CategDetails'

describe('rendering', () => {
  const category = {
    mainCateg: 'Puhelinmerkit',
    isMainCateg: true,
    subCateg: 'Laadukkaat',
    name: 'Apple',
    description: 'Öky',
    stars: 5
  }

  const component = render(
    <Categ category={category} />
  )

  test('renders only name', () => {
    expect(component.container).toHaveTextContent('name')
    expect(component.container).not.toHaveTextContent('author', 'url', 'likes')
  })

  test('detailed component has url, likes and author', () => {
    const detailedComponent = render(
      <CategDetails category={category} />
    )
    expect(detailedComponent.container).toHaveTextContent('author', 'url')
  })

  test('clicking the button two times calls event handler twice', async () => {
    const mockHandler = jest.fn()

    const component = render(
      <CategDetails category={category} handleLike={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})