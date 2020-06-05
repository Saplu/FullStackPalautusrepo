const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined){
    response.status(400).json('try better')
  }

  else{
    if(body.title === 'natural failure'){
      console.log(request.token)
    }
    if(!request.token) {
      return response.status(401).json({error: 'token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const blogToBeDeleted = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)
  if (blogToBeDeleted.user.toString() !== user._id.toString()){
    return response.status(401).json({error: 'unauthorized attempt to delete blog'})
  }
  else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  if (body.url === undefined && body.likes === undefined){
    response.status(400).json('no updateable values given, check input')
  }
  const originalBlog = await Blog.findById(request.params.id)

  const blog = {
    url: body.url || originalBlog.url,
    likes: body.likes || originalBlog.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
})

module.exports = blogsRouter