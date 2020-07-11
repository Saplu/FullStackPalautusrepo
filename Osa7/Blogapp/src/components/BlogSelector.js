import React from 'react'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'

const BlogSelector = ({blogs, likeButtonClick, deleteButtonClick, user}) => {
  const id = useParams().id
  if(blogs.length === 0)
    return null
  const blog = blogs.find(b => b.id === id)
  if(blog === undefined)
    return null

  return(
    <Blog blog={blog} likeButtonClick={likeButtonClick} deleteButtonClick={deleteButtonClick} user={user} details={true} />
  )
}

export default BlogSelector