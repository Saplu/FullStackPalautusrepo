const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'asd',
    author: 'vaimo',
    url: 'www.com',
    likes: 3,
    userId: '5ed8e7e864bed53290c243bd'
  },
  {
    title: 'asdf',
    author: 'pasi',
    url: 'www.com',
    likes: 2,
    userId: '5ed8e7e864bed53290c243bd'
  },
  {
    title: 'asdfg',
    author: 'pasi',
    url: 'www.com',
    likes: 7,
    userId: '5ed8e7e864bed53290c243bd'
  },
  {
    title: 'asdfgh',
    author: 'pinja',
    url: 'www.com',
    likes: 1,
    userId: '5ed8e7e864bed53290c243bd'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}