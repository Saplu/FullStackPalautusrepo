import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const defaultLike = () => {

}

const defaultDelete = () => {

}

test('Shows only title and author by default', () => {
  const blog = {
    title: 'Testi',
    author: 'Saplu',
    url: 'www.com',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} user='Saplu' likeButtonClick={defaultLike} deleteButtonClick={defaultDelete}/>
  )

  component.debug()

  expect(component.container).toHaveTextContent('Testi')
  expect(component.container).toHaveTextContent('Saplu')
  expect(component.container).not.toHaveTextContent('www.com')
  expect(component.container).not.toHaveTextContent(5)
})

test('Shows all info when more info - button is pressed', () => {
  const blog = {
    title: 'Testi',
    author: 'Saplu',
    url: 'www.com',
    likes: 5,
    user: {
      name: 'minä',
      user: {
        username: 'Saplu'
      }
    }
  }

  const component = render(
    <Blog blog={blog} user='Saplu' likeButtonClick={defaultLike} deleteButtonClick={defaultDelete}/>
  )

  component.debug()

  const button = component.getByText('Show details')
  fireEvent.click(button)

  component.debug()

  expect(component.container).toHaveTextContent('Testi')
  expect(component.container).toHaveTextContent('Saplu')
  expect(component.container).toHaveTextContent('www.com')
  expect(component.container).toHaveTextContent(5)
})