import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MainCategForm from '../components/MainCategForm'

test('<MainCategForm /> updates parent state and calls onSubmit', () => {
  const addMainCateg = jest.fn()
  const handleMainCategChange = jest.fn()

  const component = render(
    <MainCategForm
      addMainCateg={addMainCateg}
      newMainCateg='newcateg'
      handleMainCategChange={handleMainCategChange}
    />
  )

  const newMainCateg = component.container.querySelector('#main-categ')

  const form = component.container.querySelector('#main-categ-form')

  fireEvent.change(newMainCateg, {
    target: { value: 'newmaincateg' }
  })
  fireEvent.submit(form)

  expect(addMainCateg.mock.calls).toHaveLength(1)
})