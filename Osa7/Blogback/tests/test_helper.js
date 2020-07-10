const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'asd',
    author: 'vaimo',
    url: 'www.com',
    likes: 3,
    userId: '5ed9fe092321f3252855139f'
  },
  {
    title: 'asdf',
    author: 'pasi',
    url: 'www.com',
    likes: 2,
    userId: '5ed9fe092321f3252855139f'
  },
  {
    title: 'asdfg',
    author: 'pasi',
    url: 'www.com',
    likes: 7,
    userId: '5ed9fe092321f3252855139f'
  },
  {
    title: 'asdfgh',
    author: 'pinja',
    url: 'www.com',
    likes: 1,
    userId: '5ed9fe092321f3252855139f'
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