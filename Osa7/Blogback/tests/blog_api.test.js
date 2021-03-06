const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('blogtests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .send(helper.initialBlogs[0])
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .send(helper.initialBlogs[1])
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .send(helper.initialBlogs[2])
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .send(helper.initialBlogs[3])
  })

  test('blogs are returned  as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id is correctly named', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'JSfulness',
      author: 'pasi',
      url: 'www.fi',
      likes: 2,
      userId: '5ed9fe092321f3252855139f'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('JSfulness')
  })

  test('if no value for likes is given, put 0 likes', async () => {
    const newBlog = {
      title: 'No one likes me',
      author: 'Pinja',
      url: 'www.sad',
      userId: '5ed9fe092321f3252855139f'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes[likes.length - 1]).toBe(0)
  })

  test('no token returns status 401', async () => {
    const newBlog = {
      title: 'natural failure',
      author: 'Pinja',
      url: 'www.invalid.fi',
      likes: 10,
      userId: '5ed9fe092321f3252855139f'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('no title throws bad request', async () => {
    const newBlog = {
      author: 'Pasi',
      url: 'www.invalidBlog.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('no url throws bad request', async () => {
    const newBlog = {
      title: 'Paper beats internet',
      author: 'Pasi',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('delete of blog succeeds with 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhcGx1IiwiaWQiOiI1ZWQ5ZmUwOTIzMjFmMzI1Mjg1NTEzOWYiLCJpYXQiOjE1OTEzNDQ2NzB9.D9g2wqZDRzUY-xl9G3Pgn0DwDc0Cj9GJ5tEvOZQ-Fe0')
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  })

  test('update likes of blog successful', async () => {
    const blogs = await helper.blogsInDb()
  
    const updatedBlog = {
      likes: 12
    }

    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(updatedBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(12)
    expect(blogsAtEnd[0].url).toEqual('www.com')
  })

  test('update url of blog successful', async () => {
    const blogs = await helper.blogsInDb()
  
    const updatedBlog = {
      url: 'www.fi'
    }

    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(updatedBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(3)
    expect(blogsAtEnd[0].url).toEqual('www.fi')
  })

  test('update without url or likes ends with status 400', async () => {
    const blogs = await helper.blogsInDb()

    const updatedBlog = {
      uri: 'www.asd.com',
      lieks: 9000
    }

    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(updatedBlog)
      .expect(400)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'first', name: 'eka', passwordHash})
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'isap',
      name: 'pasi',
      password: 'pinja'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(user => user.username)
    
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails without password with code 400', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'fail',
      name: 'äiti'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })

  test('creation fails without username with code 400', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'äiti',
      password: 'hyväpitkäsalasana'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })

  test('creation fails with too short password with code 400', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fail',
      name: 'äiti',
      password: 'as'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})