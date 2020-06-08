import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('wrong credentials')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    await blogService.create(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(await blogService.getAll())
    setMessage(`new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <Notification message={message} success="error" />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <Notification message={message} success='success'/>
      
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>
        <div>
          author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>
          url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
        <button type="submit">Add</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ? 
        loginForm() :
        blogForm()
      }

    </div>    
  )
}

export default App