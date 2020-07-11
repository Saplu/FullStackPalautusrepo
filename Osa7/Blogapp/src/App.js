import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Users from './components/User'
import BlogSelector from './components/BlogSelector'
import { Form, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const blogFormRef = React.createRef()

  const padding = {
    padding: 5,
  }

  const loginSpacing = {
    width: '50%',
    height: 30,
    margin: 15
  }

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

  useEffect(() => {
    userService.getAll()
      .then(users =>
        setUsers(users))
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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control
            id="username"
            placeholder="username"
            style={loginSpacing}
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Control
            id="password"
            placeholder="password"
            style={loginSpacing}
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )

  const blogForm = () => (
    <Router>
      <div>
        <p><Link style={padding} to="/users">users</Link><Link style={padding} to="/">home</Link>{user.name} logged in <button onClick={logOut}>logout</button></p>
        <Switch>
          <Route path="/users/:id">
            <Users users={users} details={true} />
          </Route>
          <Route path="/users">
            <Users users={users} details={false}/>
          </Route>
          <Route path="/blogs/:id">
            <BlogSelector blogs={blogs} likeButtonClick={blogButtonClick} deleteButtonClick={deleteButtonClick} user={user.username} />
          </Route>
          <Route path="/">
            <h2>Blogs</h2>
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
          </Route>
        </Switch>
      </div>
    </Router>
  )

  return (
    <div className="container">
      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App