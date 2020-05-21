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

module.exports = {
  dummy,
  totalLikes
}