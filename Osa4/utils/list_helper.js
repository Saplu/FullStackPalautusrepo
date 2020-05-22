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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}