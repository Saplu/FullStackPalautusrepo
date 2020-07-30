const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://Saplu:salis@librarycluster.cxels.mongodb.net/LibraryDb?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDb')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDb', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: String
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }
  type Mutation {
    addBook(
      title: String!
      name: String!
      born: String
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }
      if (args.author && args.genre){
        const authorsFiltered = books.filter(b => b.author === args.author)
        return authorsFiltered.filter(b => b.genres.includes(args.genre))
      }
      if (args.author){
        return books.filter(b => b.author === args.author)
      }
      return books.filter(b => b.genres.includes(args.genre))
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.name})
      const book = new Book({ ...args})
      book.author = author
      // console.log(book)
      // console.log(author)
      return book.save()
      // const authorNames = authors.map(a => a.name)
      // if (!authorNames.includes(args.author)){
      //   const author = {
      //     name: args.author,
      //     id: uuid()
      //   }
      //   authors = authors.concat(author)
      // }
      // const book = { ...args, id: uuid()}
      // books = books.concat(book)
      // return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author)
        return null
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    },
    addAuthor: (root, args) => {
      const author = new Author({ ...args })
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})