import React from 'react'
import { gql, useQuery } from '@apollo/client'

const Books = (props) => {
  const getBooks = gql `
    query {
      allBooks {
        title
        author
        published
      }
    }
  `

  const result = useQuery(getBooks, {
    pollInterval: 2000
  })

  if (!props.show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books