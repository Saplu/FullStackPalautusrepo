import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [message, setMessage] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
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
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 4000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    setBlogs(await blogService.getAll())
    dispatch(setNotification(`new blog ${blogObject.title} by ${blogObject.author} added`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 4000)
  }

  const blogButtonClick = async (blogId) => {
    await blogService.like(blogId)
    setBlogs(await blogService.getAll())
  }

  const deleteButtonClick = async (blogId) => {
    await blogService.remove(blogId)
    setBlogs(await blogService.getAll())
  }

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <Notification success="error" />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <Notification success='success'/>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          likeButtonClick={blogButtonClick}
          deleteButtonClick={deleteButtonClick}
          user={user.username}
        />
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