const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SALAISUUKSIEN_KAMMIO'

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: String
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
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
    ):  Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name})
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new Error("Not authenticated")
      }

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
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser){
        throw new Error("Not authenticated")
      }

      author.born = args.setBornTo
      try{
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
      
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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salis') {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})