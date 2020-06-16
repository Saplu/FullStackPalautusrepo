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

  const button = component.getByText('Show details')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Testi')
  expect(component.container).toHaveTextContent('Saplu')
  expect(component.container).toHaveTextContent('www.com')
  expect(component.container).toHaveTextContent(5)
})

test('Like button works as intended', () => {
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

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user='Saplu' likeButtonClick={mockHandler} deleteButtonClick={defaultDelete}/>
  )

  const detailButton = component.getByText('Show details')
  fireEvent.click(detailButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})