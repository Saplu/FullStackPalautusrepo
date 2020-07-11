import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likeButtonClick, deleteButtonClick, user, details=false }) => {
  const [showDetails, setShowDetails] = useState(details)

  const blogStyle = {
    width: '40%',
    color: 'black'
  }

  const handleButtonClick = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  const handleLikeButtonClick = (event) => {
    event.preventDefault()
    likeButtonClick(blog.id)
  }

  const handleDeleteButtonClick = (event) => {
    event.preventDefault()
    if (window.confirm(`Sure you want to remove blog ${blog.title}?`)){
      deleteButtonClick(blog.id)
    }
  }

  const deleteVisible = () => (
    <button id="delete" onClick={handleDeleteButtonClick}>delete</button>
  )

  const noDetails = () => (
    <div className='blog'>
      <Link style={blogStyle} to={`/blogs/${blog.id}`}>{blog.title} {blog.author} <button id="show" onClick={handleButtonClick}>Show details</button></Link>
    </div>
  )

  const moreDetails = () => (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} <button id="hide" onClick={handleButtonClick}>Hide Details</button>
      </div>
      <div>
        author: {blog.author}
      </div>
      <div>
        url: {blog.url}
      </div>
      <div>
        likes: {blog.likes} <button id="like" onClick={handleLikeButtonClick}>like</button>
      </div>
      <div>
        name: {blog.user.name}
      </div>
      <div>
        {user === blog.user.username ?
          deleteVisible() :
          null}
      </div>
    </div>
  )

  return (
    <div>
      {showDetails === false ?
        noDetails() :
        moreDetails()
      }
    </div>
  )
}

Blog.propTypes = {
  likeButtonClick: PropTypes.func.isRequired,
  deleteButtonClick: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog
