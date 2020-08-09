import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { getBooks } from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState(props.genre ? props.genre : null)

  const result = useQuery(getBooks, {
    pollInterval: 2000
  })

  if (!props.show || result.loading) {
    return null
  }

  const GenreButtons = () => {
    if (props.show === 'recommend'){
      return null
    }
    const allGenres = result.data.allBooks.map(b => b.genres)
    const merged = [].concat.apply([], allGenres)
    const unique = [...new Set(merged)]
    return (
      <div>
        {unique.map(u =>
          <button key={u} value={u} onClick={({target}) => setGenres(target.value)}>{u}</button>  
        )}
        {<button key="all" onClick={({target}) => setGenres(null)}>All</button>}
      </div>
    )
  }

  const BooksToShow = () => {
    const correctBooks = (genres !== null ? result.data.allBooks.filter(a => a.genres.includes(genres)) : result.data.allBooks)
    
    return (
      <div>
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
              {correctBooks.map(c =>
                <tr key={c.title}>
                  <td>{c.title}</td>
                  <td>{c.author.name}</td>
                  <td>{c.published}</td>
                </tr>
              )}
          </tbody>
        </table> 
      </div>
    )  
  }

  return (
    <div>
      <h2>{(props.show === 'recommend' ? 'Recommended' : 'Books')}</h2>
      <p>{genres === null ? `selected genre: all` : `selected genre: ${genres}`}</p>
      <GenreButtons/>
      <BooksToShow/>
    </div>
  )
}

export default Books