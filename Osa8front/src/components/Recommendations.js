import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import Books from './Books'

const RecommendedBooks = (props) => {
  const result = useQuery(ME, {
    pollInterval: 2000
  })

  if (!props.show || result.loading){
    return null
  }
  const genre = result.data.me.favoriteGenre

  return (
    <Books
      show='recommend'
      genre={genre}
    />
  )
}

export default RecommendedBooks