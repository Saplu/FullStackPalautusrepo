const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  return blogs.length === 0
    ?  0
    :  likes.reduce(function(a, b){
      return a + b
    }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null
  const favorite = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes)
      ? prev
      : current
  })
  const value = {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }
  return value
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null
  const count = _.map(_.countBy(blogs, 'author'), (val, key) => ({author: key, blogs: val}))
  const sorted = count.sort((a, b) => (a.blogs > b.blogs) ? -1 : 1)
  return sorted[0]
}

const mostPopularAuthor = (blogs) => {
  if (blogs.length === 0)
    return null
  const count = _(blogs)
    .groupBy('author')
    .map((val, key) => ({
      'author': key,
      'likes': _.sumBy(val, 'likes')
    })).value()
  const sorted = count.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  return sorted[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostPopularAuthor
}