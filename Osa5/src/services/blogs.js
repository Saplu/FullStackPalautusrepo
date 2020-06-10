import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const blogs = response.data
  const sortedBlogs = [].concat(blogs)
    .sort((a, b) => a.likes < b.likes ? 1 : -1)
  return sortedBlogs
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async id => {
  const blogToBeLiked = await axios.get(`${baseUrl}/${id}`)
  const likedBlog = {
    user: blogToBeLiked.data.user.id,
    likes: blogToBeLiked.data.likes + 1,
    author: blogToBeLiked.data.author,
    title: blogToBeLiked.data.title,
    url: blogToBeLiked.data.url
  }
  const response = await axios.put(`${baseUrl}/${id}`, likedBlog)
  return response.data
}

export default { getAll, create, setToken, like }