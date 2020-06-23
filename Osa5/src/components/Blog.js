import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeButtonClick, deleteButtonClick, user }) => {
  const [showDetails, setShowDetails] = useState(false)
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
    <button onClick={handleDeleteButtonClick}>delete</button>
  )

  const noDetails = () => (
    <div className='blog'>
      {blog.title} {blog.author} <button id="show" onClick={handleButtonClick}>Show details</button>
    </div>
  )

  const moreDetails = () => (
    <div className='blog'>
      <div>
        {blog.title} <button onClick={handleButtonClick}>Hide Details</button>
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
