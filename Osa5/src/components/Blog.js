import React, {useState} from 'react'

const Blog = ({ blog, blogButtonClick }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleButtonClick = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  const noDetails = () => (
    <div className='blog'>
      {blog.title} <button onClick={handleButtonClick}>Show details</button>
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
        likes: {blog.likes} <button>like</button>
      </div>
      <div>
        name: {blog.user.name}
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

export default Blog
