import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'first test blog',
  author: 'this guy',
  url: 'testblogs.com',
  id: 'id1',
  likes: 2,
  user: {
    id:'userId1',
    username: 'root',
    name: 'Ruth Rootington'
  }
}

const user = {
  id:'userId1',
  username: 'root',
  name: 'Ruth Rootington'

}

test('renders author and title', () => {


  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'first test blog this guy'
  )

  const div = component.container.querySelector('.viewMoreBlog')

  expect(div).toHaveStyle('display: none')

})

test('after clicking the button, children are displayed', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.viewMoreBlog')
  expect(div).not.toHaveStyle('display: none')

  expect(component.container).toHaveTextContent(
    'testblogs.comLikes 2'
  )
})

test('after clicking like twice, event handler is called twice', () => {
  const mockHandler = jest.fn( x => x )

  const component = render(
    <Blog blog={blog} user={user} addLike={mockHandler} />
  )

  const button1 = component.getByText('view')
  fireEvent.click(button1)

  const button2 = component.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})