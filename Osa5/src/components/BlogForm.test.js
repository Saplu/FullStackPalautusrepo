import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Callback funcion gets correct input', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Heppaelämää' }
  })
  fireEvent.change(author, {
    target: { value: 'Heppatyttö' }
  })
  fireEvent.change(url, {
    target: { value: 'ht.net' }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Heppaelämää')
  expect(mockHandler.mock.calls[0][0].author).toBe('Heppatyttö')
  expect(mockHandler.mock.calls[0][0].url).toBe('ht.net')
})