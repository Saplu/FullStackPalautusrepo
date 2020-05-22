const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
    {
        _id: '123',
        title: 'asd',
        author: 'pasi',
        url: 'www.com',
        likes: 3,
        __v: 0
    }
]
const listWithMoreBlogs = [
    {
        _id: '123',
        title: 'asd',
        author: 'pasi',
        url: 'www.com',
        likes: 3,
        __v: 0
    },
    {
        _id: '1234',
        title: 'asdf',
        author: 'pasi',
        url: 'www.com',
        likes: 2,
        __v: 0
    },
    {
        _id: '12345',
        title: 'asdfg',
        author: 'pasi',
        url: 'www.com',
        likes: 7,
        __v: 0
    },
    {
        _id: '123456',
        title: 'asdfgh',
        author: 'pasi',
        url: 'www.com',
        likes: 1,
        __v: 0
    }
]
const listWithEqualLikes = [
    {
        _id: '123',
        title: 'asd',
        author: 'pasi',
        url: 'www.com',
        likes: 3,
        __v: 0
    },
    {
        _id: '1234',
        title: 'asdf',
        author: 'pasi',
        url: 'www.com',
        likes: 7,
        __v: 0
    },
    {
        _id: '12345',
        title: 'asdfg',
        author: 'pasi',
        url: 'www.com',
        likes: 7,
        __v: 0
    },
    {
        _id: '123456',
        title: 'asdfgh',
        author: 'pasi',
        url: 'www.com',
        likes: 7,
        __v: 0
    }
]
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        expect(listHelper.totalLikes(blogs)).toBe(0)
    })

    test('List with one blog equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(3)
    })

    test('List with many items is calculated correctly', () => {
        expect(listHelper.totalLikes(listWithMoreBlogs)).toBe(13)
    })
})

describe('most likes', () => {
    test('of empty list is null', () => {
        const blogs = []
        expect(listHelper.favoriteBlog(blogs)).toBe(null)
    })
    test('List with one blog returns that blog', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
            title: 'asd',
            author: 'pasi',
            likes: 3
        })
    })
    test('Big list returns correct blog', () => {
        expect(listHelper.favoriteBlog(listWithMoreBlogs)).toEqual({
            title: 'asdfg',
            author: 'pasi',
            likes: 7
        })
    })
    test('Many blogs with equal likes returns last of them', () => {
        expect(listHelper.favoriteBlog(listWithEqualLikes)).toEqual({
            title:'asdfgh',
            author: 'pasi',
            likes: 7
        })
    })
})