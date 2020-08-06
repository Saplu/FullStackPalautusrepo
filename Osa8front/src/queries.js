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
    }
  }
  `

export const addNewBook = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
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
    }
  }
  `