import { gql } from '@apollo/client'

export const getAuthors = gql `
  query {
    allAuthors {
      name
      born
    }
  }
  `
export const getBooks = gql `
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres     
    }
  }
  `

export const ADDBOOK = gql`
  mutation addBook($title: String!, $name: String! $published: Int!, $genres: [String!]!){
    addBook(
      title: $title
      name: $name
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
  `

export const modifyAuthor = gql`
  mutation editAuthor($year: Int!, $name: String!){
    editAuthor(
      name: $name
      setBornTo: $year
    ) {
      name
      born
    }
  }
  `

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
  `

export const ME = gql`
  query{
    me {
      favoriteGenre
    }
  }
  `
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
    }
  }
  `