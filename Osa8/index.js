const { ApolloServer, gql, UserInputError } = require('apollo-server')
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
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({})
        return books
      }
      if (args.author && args.genre){
        const books = await Book.find({})
        return books
      }
      if (args.author){
        const books = await Book.find({})
        return books
      }
      else {
        const books = await Book.find({ genres: { $in: args.genre }})
        return books
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.name})
      if (author){
        const book = new Book({ ...args})
        book.author = author
        try{
          await book.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      }
      const newAuthor = new Author({name: args.name})
      try{
        await newAuthor.save()
        const newBook = new Book({ title: args.title, author: newAuthor, published: args.published, genres: args.genres})
        await newBook.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try{
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try{
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
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