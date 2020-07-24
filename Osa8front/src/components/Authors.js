import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getAuthors, modifyAuthor } from '../queries'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [ mutateYear ] = useMutation(modifyAuthor)

  const result = useQuery(getAuthors, {
    pollInterval: 2000
  })

  const changeYear = async (event) => {
    event.preventDefault()
    mutateYear({ variables: { year, name } })
    setName('')
    setYear('')
  }

  if (!props.show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={changeYear}>
          <select value={name} onChange={({target}) => setName(target.value)}>
            {result.data.allAuthors.map(a => 
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
          <div>
            birth:
            <input
              type='number'
              value={year}
              onChange={({target}) => setYear(parseInt(target.value))}
            />
          </div>
          <button type='submit'>Set year of birth</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
